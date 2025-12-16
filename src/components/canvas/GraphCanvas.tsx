import { useEffect } from 'react'
import {
    ReactFlow,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    useReactFlow
} from '@xyflow/react'
import type {
    Connection,
    Edge,
    Node
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useAppStore } from '@/store/useAppStore'
import { useQuery } from '@tanstack/react-query'
import ServiceNode from './ServiceNode'

const nodeTypes = {
    serviceNode: ServiceNode,
}

export function GraphCanvas() {
    const { selectedAppId, setSelectedAppId, setSelectedNodeId } = useAppStore()

    // Fetch apps to auto-select one if needed
    const { data: apps } = useQuery({
        queryKey: ['apps'],
        queryFn: async () => {
            const res = await fetch('/api/apps')
            return res.json()
        }
    })

    // Auto-select first app
    useEffect(() => {
        if (apps && apps.length > 0 && !selectedAppId) {
            setSelectedAppId(apps[0].id)
        }
    }, [apps, selectedAppId, setSelectedAppId])

    // Fetch graph for selected app
    const { data: graphData, isLoading, isError } = useQuery({
        queryKey: ['graph', selectedAppId],
        queryFn: async () => {
            if (!selectedAppId) return { nodes: [], edges: [] }
            const res = await fetch(`/api/apps/${selectedAppId}/graph`)
            if (!res.ok) throw new Error('Network response was not ok')
            return res.json()
        },
        enabled: !!selectedAppId
    })


    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

    // Keyboard shortcuts
    const { fitView } = useReactFlow()
    const { isMobilePanelOpen, setMobilePanelOpen } = useAppStore()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement).tagName === 'INPUT') return

            if (e.key === 'f') {
                fitView({ duration: 800 })
            }
            if (e.key === 't') {
                setMobilePanelOpen(!isMobilePanelOpen) // For mobile
                // For desktop we could toggle a separate state, but right now panel is fixed.
                // Let's assume 't' is for resizing/fitting for now as panel is fixed on desktop.
                // Or we can implement a collapsible panel state in store.
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [fitView, isMobilePanelOpen, setMobilePanelOpen])

    // Sync graph data to local state when it changes (new app selected)
    useEffect(() => {
        if (graphData) {
            setNodes(graphData.nodes || [])
            setEdges(graphData.edges || [])
            // Clear selection on app change
            setSelectedNodeId(null)
        }
    }, [graphData, setNodes, setEdges, setSelectedNodeId])

    const onConnect = (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds))

    const onNodeClick = (_: React.MouseEvent, node: Node) => {
        setSelectedNodeId(node.id)
    }

    const onPaneClick = () => {
        setSelectedNodeId(null)
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="text-destructive font-semibold">Failed to load graph data</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    Retry
                </button>
            </div>
        )
    }

    if (isLoading && !nodes.length) {
        return <div className="flex items-center justify-center h-full">Loading Graph...</div>
    }

    return (
        <div className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                deleteKeyCode={["Backspace", "Delete"]}
            >
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                <Controls />
            </ReactFlow>
        </div>
    )
}
