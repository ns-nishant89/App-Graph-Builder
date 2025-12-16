import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import type { App } from '@/services/mockData';
import { cn } from '@/lib/utils'
import { ChevronRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function AppSelector() {
    const { selectedAppId, setSelectedAppId } = useAppStore()

    const handleAppSelect = (app: App) => {
        if (selectedAppId === app.id) return
        setSelectedAppId(app.id)
        toast.info(`Switched to ${app.name}`)
    }

    const { data: apps, isLoading } = useQuery<App[]>({
        queryKey: ['apps'],
        queryFn: async () => {
            const res = await fetch('/api/apps')
            if (!res.ok) throw new Error('Network response was not ok')
            return res.json()
        }
    })

    const appList = apps || []

    return (
        <div className="flex flex-col gap-1">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}

            {appList.map((app) => (
                <Button
                    key={app.id}
                    variant="ghost"
                    className={cn(
                        "justify-between font-normal",
                        selectedAppId === app.id && "bg-accent text-accent-foreground font-medium"
                    )}
                    onClick={() => handleAppSelect(app)}
                >
                    {app.name}
                    {selectedAppId === app.id && <ChevronRight className="h-4 w-4 opacity-50" />}
                </Button>
            ))}
        </div>
    )
}
