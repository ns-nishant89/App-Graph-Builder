import { useEffect, useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import { useAppStore } from '@/store/useAppStore'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export function NodeInspector() {
    const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useAppStore()
    const { getNode, setNodes } = useReactFlow()

    // Local state for inputs to avoid stutter
    const [label, setLabel] = useState('')
    const [memory, setMemory] = useState(0)

    // Fetch current node data
    const node = selectedNodeId ? getNode(selectedNodeId) : null

    // Sync local state when node selection changes
    useEffect(() => {
        if (node) {
            setLabel((node.data.label as string) || '')
            setMemory((node.data.config as any)?.memory || 0)
        }
    }, [node?.id, node?.data?.label, (node?.data?.config as any)?.memory])

    if (!node) {
        return <div className="text-sm text-muted-foreground p-4">Select a node to view details</div>
    }

    const handleLabelChange = (val: string) => {
        setLabel(val)
        setNodes((nds) =>
            nds.map((n) => n.id === node.id ? { ...n, data: { ...n.data, label: val } } : n)
        )
    }

    const handleMemoryChange = (val: number) => {
        setMemory(val)
        setNodes((nds) =>
            nds.map((n) => n.id === node.id ? {
                ...n,
                data: {
                    ...n.data,
                    config: { ...(n.data.config as any), memory: val }
                }
            } : n)
        )
    }

    const status = (node.data.status as string) || 'unknown'
    const statusColor = status === 'healthy' ? 'bg-green-500' : status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Service Node</h3>
                <Badge variant="outline" className="gap-2 capitalize">
                    <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                    {status}
                </Badge>
            </div>

            <div className="grid gap-2">
                <Label>Node Name</Label>
                <Input
                    value={label}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLabelChange(e.target.value)}
                />
            </div>

            <Tabs value={activeInspectorTab} onValueChange={setActiveInspectorTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="config">Config</TabsTrigger>
                    <TabsTrigger value="runtime">Runtime</TabsTrigger>
                </TabsList>

                <TabsContent value="config" className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Memory Allocation (MB)</Label>
                        <div className="flex items-center gap-4">
                            <Slider
                                value={[memory]}
                                onValueChange={(vals: number[]) => handleMemoryChange(vals[0])}
                                max={100}
                                step={1}
                                className="flex-1"
                            />
                            <Input
                                type="number"
                                value={memory}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMemoryChange(parseInt(e.target.value) || 0)}
                                className="w-20"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Adjust allocated memory for this service.</p>
                    </div>
                </TabsContent>

                <TabsContent value="runtime" className="py-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-sm">Runtime metrics placeholder.</div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
