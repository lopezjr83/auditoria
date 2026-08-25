import { Suspense } from 'react'
import DashboardLayoutContent from './dashboard-layout-content'

export const dynamic = 'force-dynamic'

function DashboardLayoutLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Cargando...</div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<DashboardLayoutLoading />}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  )
}
