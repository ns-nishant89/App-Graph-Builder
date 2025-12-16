import { Home, Layers, Settings, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LeftRail() {
    return (
        <div className="w-16 border-r bg-card flex flex-col items-center py-4 gap-4 z-20">
            <div className="mb-4">
                <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                    <Layers className="h-5 w-5 text-primary-foreground" />
                </div>
            </div>

            <nav className="flex flex-col gap-2">
                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Home">
                    <Home className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg bg-muted" aria-label="Apps">
                    <Activity className="h-5 w-5 text-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Settings">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                </Button>
            </nav>
        </div>
    )
}
