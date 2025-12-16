import { useAppStore } from '@/store/useAppStore'
import {
    Sheet,
    SheetContent,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface RightPanelContentProps {
    className?: string
}

import { AppSelector } from '@/components/features/AppSelector'
import { NodeInspector } from '@/components/features/NodeInspector'

function RightPanelContent({ className }: RightPanelContentProps) {
    return (
        <div className={cn("flex flex-col h-full bg-background", className)}>
            <div className="p-4 border-b">
                <h2 className="font-semibold mb-2">Apps</h2>
                <AppSelector />
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <NodeInspector />
            </div>
        </div>
    )
}

export function RightPanel() {
    const { isMobilePanelOpen, setMobilePanelOpen } = useAppStore()

    return (
        <>
            {/* Desktop Panel */}
            <aside className="hidden md:flex w-80 flex-col border-l bg-card z-10 transition-all duration-300">
                <RightPanelContent />
            </aside>

            {/* Mobile Drawer */}
            <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
                <SheetContent side="right" className="p-0 sm:max-w-xs w-80">
                    <RightPanelContent className="h-full" />
                </SheetContent>
            </Sheet>
        </>
    )
}
