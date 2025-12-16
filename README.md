# App Graph Builder

A responsive, interactive graph visualization tool built with React, ReactFlow, and Shadcn UI. This project demonstrates modern frontend architecture using Zustand for state management and TanStack Query with MSW for data simulation.

## Features

- **Interactive Graph**: Drag, select, and delete nodes on an infinite canvas.
- **Node Inspector**: Edit node properties (memory, name) with real-time 2-way sync to the graph.
- **Responsive Layout**: Collapsible/Persistent right panel that works on mobile and desktop.
- **Mock API**: Realistic network simulation with latency and error handling using MSW.

## Tech Stack

- **Framework**: React + Vite
- **Language**: TypeScript (Strict Mode)
- **UI Library**: shadcn/ui + Tailwind CSS
- **State Management**: Zustand (UI/Selection state)
- **Data Fetching**: TanStack Query
- **Graph Engine**: ReactFlow (xyflow)
- **Mocking**: Mock Service Worker (MSW)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view the app.

3. **Run Tests & Checks**
   ```bash
   npm run typecheck  # Run TypeScript compiler
   npm run lint       # Run ESLint
   npm run build      # Build for production
   ```

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com).

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts to link the project and deploy. Vercel will automatically detect the Vite settings.

## Key Engineering Decisions

- **State Separation**:
  - **Zustand** is used for global UI state (selected IDs, panel visibility) to avoid prop drilling.
  - **ReactFlow** maintains its own internal state for node positions and interactions for performance.
  - **TanStack Query** manages server state (Apps list, Graph data).
- **Component Architecture**:
  - `components/layout`: Structural shells (MainLayout, TopBar, etc.).
  - `components/canvas`: Core graph logic.
  - `components/features`: Domain-specific features (Inspector, Selector).
  - `components/ui`: Reusable primitives (Shadcn).
- **Mocking Strategy**:
  - MSW is used to intercept network requests at the browser level. This allows the application code to be written exactly as if it were talking to a real backend (`fetch('/api/...')`), making future integration seamless.

## Known Limitations

- **Persistence**: Changes made in the inspector (e.g., node name, memory) updates the local graph state but does not persist to the "backend" (mock data reset on reload).
- **Add Node**: Currently, you can only view/edit existing nodes. The "Add Node" functionality is a placeholder.
- **Error Handling**: Random 500 errors are simulated on the graph endpoint (10% chance) to demonstrate error UI.
