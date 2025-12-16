import { Bell, Search, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useReactFlow } from '@xyflow/react'
import { toast } from 'sonner'

export function TopBar() {
    const { setNodes } = useReactFlow()

    const handleAddNode = () => {
        const id = `new-node-${Date.now()}`
        const newNode = {
            id,
            position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
            data: {
                label: 'New Service',
                status: 'healthy',
                job: 'service',
                config: { memory: 1, instances: 1 }
            },
            type: 'serviceNode',
        }
        setNodes((nds) => nds.concat(newNode))
        toast.success("Service Node Added", {
            description: "A new service node has been added to the canvas."
        })
    }

    return (
        <header className="h-14 border-b bg-background flex items-center justify-between px-4 z-10">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg tracking-tight">App Graph Builder</h1>
                <Button variant="outline" size="sm" className="h-8 gap-2" onClick={handleAddNode}>
                    <PlusCircle className="h-4 w-4" />
                    Add Node
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-medium">
                    JD
                </div>
            </div>
        </header>
    )
}
