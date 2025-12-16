import { http, HttpResponse, delay } from 'msw'
import { mockApps, generateGraph } from '../services/mockData'

export const handlers = [
    http.get('/api/apps', async () => {
        await delay(300) // Simulate latency
        return HttpResponse.json(mockApps)
    }),

    http.get('/api/apps/:appId/graph', async ({ params }) => {
        await delay(500)
        const { appId } = params
        if (Math.random() < 0.1) {
            return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
        }
        const graph = generateGraph(appId as string)
        return HttpResponse.json(graph)
    }),

    http.get('/api/user', () => {
        return HttpResponse.json({
            code: 0,
            data: { name: 'Mock User', role: 'admin' },
        })
    }),
]
