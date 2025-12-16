import { create } from 'zustand'

interface AppState {
    selectedAppId: string | null
    setSelectedAppId: (id: string | null) => void

    selectedNodeId: string | null
    setSelectedNodeId: (id: string | null) => void

    isMobilePanelOpen: boolean
    setMobilePanelOpen: (isOpen: boolean) => void

    activeInspectorTab: string
    setActiveInspectorTab: (tab: string) => void
}

export const useAppStore = create<AppState>((set) => ({
    selectedAppId: null,
    setSelectedAppId: (id) => set({ selectedAppId: id }),

    selectedNodeId: null,
    setSelectedNodeId: (id) => set({ selectedNodeId: id }),

    isMobilePanelOpen: false,
    setMobilePanelOpen: (isOpen) => set({ isMobilePanelOpen: isOpen }),

    activeInspectorTab: 'config',
    setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}))
