import { ReactFlowProvider } from '@xyflow/react'
import { MainLayout } from '@/components/layout/MainLayout'
import { GraphCanvas } from '@/components/canvas/GraphCanvas'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <ReactFlowProvider>
      <MainLayout>
        <GraphCanvas />
      </MainLayout>
      <Toaster />
    </ReactFlowProvider>
  )
}

export default App
