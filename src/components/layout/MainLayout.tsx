import type { ReactNode } from 'react'
import { LeftRail } from './LeftRail'
import { TopBar } from './TopBar'
import { RightPanel } from './RightPanel'

interface MainLayoutProps {
    children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
            <LeftRail />

            <div className="flex flex-col flex-1 min-w-0">
                <TopBar />

                <div className="flex flex-1 overflow-hidden relative">
                    <main className="flex-1 relative overflow-hidden bg-muted/20">
                        {children}
                    </main>

                    <RightPanel />
                </div>
            </div>
        </div>
    )
}
