import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Server, Database } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function ServiceNode({ data, selected }: { data: any, selected: boolean }) {
    const status = data.status || 'unknown'
    const statusColor = status === 'healthy' ? 'bg-green-500' : status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
    const isDb = data.job === 'database'

    return (
        <Card className={cn(
            "w-[200px] shadow-md transition-all duration-200",
            selected ? "ring-2 ring-primary border-primary" : "border-border",
            isDb ? "bg-slate-50 dark:bg-slate-900" : ""
        )}>
            <CardHeader className="p-3 pb-1 space-y-0">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className={cn("p-1 rounded", isDb ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "bg-muted text-muted-foreground")}>
                            {isDb ? <Database className="h-4 w-4" /> : <Server className="h-4 w-4" />}
                        </div>
                        <span className="truncate">{data.label}</span>
                    </CardTitle>
                    <div className={cn("h-2 w-2 rounded-full", statusColor)} />
                </div>
            </CardHeader>

            <CardContent className="p-3 pt-2">
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-[10px] h-5">
                        v1.0.2
                    </Badge>
                    <Badge variant="outline" className="text-[10px] h-5">
                        {(data.config?.memory || 0) + 'MB'}
                    </Badge>
                </div>
            </CardContent>

            <Handle type="target" position={Position.Left} className="w-3 h-3 bg-muted-foreground" />
            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-muted-foreground" />
        </Card>
    )
}

export default memo(ServiceNode)
