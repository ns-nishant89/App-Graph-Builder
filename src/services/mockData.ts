export interface ServiceNodeData {
    job?: 'service' | 'database'
    status: 'healthy' | 'degraded' | 'down'
    config: {
        memory: number
        instances: number
    }
}

export interface App {
    id: string
    name: string
    createdAt: string
}

export const mockApps: App[] = [
    { id: 'app-alpha', name: 'Alpha Service', createdAt: '2023-01-01' },
    { id: 'app-beta', name: 'Beta Analytics', createdAt: '2023-02-15' },
    { id: 'app-gamma', name: 'Gamma Store', createdAt: '2023-03-30' },
]

export const generateGraph = (appId: string) => {
    // Deterministic "random" generation based on appId
    const nodeCount = appId === 'app-alpha' ? 5 : appId === 'app-beta' ? 3 : 7
    const nodes = Array.from({ length: nodeCount }).map((_, i) => ({
        id: `${appId}-node-${i}`,
        position: { x: 100 + i * 150, y: 100 + (i % 2) * 50 },
        data: {
            label: `Service ${i + 1}`,
            job: Math.random() > 0.7 ? 'database' : 'service',
            status: Math.random() > 0.8 ? 'down' : Math.random() > 0.6 ? 'degraded' : 'healthy',
            config: {
                memory: Math.floor(Math.random() * 100),
                instances: Math.floor(Math.random() * 10) + 1
            }
        },
        type: 'serviceNode', // or custom type later
    }))

    const edges = nodes.slice(0, -1).map((node, i) => ({
        id: `e-${node.id}-${nodes[i + 1].id}`,
        source: node.id,
        target: nodes[i + 1].id,
    }))

    return { nodes, edges }
}
