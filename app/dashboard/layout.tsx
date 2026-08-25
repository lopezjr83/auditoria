'use client'

export const dynamic = 'force-dynamic'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (status === 'unauthenticated') {
      redirect('/auth/login')
    }
  }, [status])

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 border-b border-border">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-lg font-black text-primary-foreground">
                ✓
              </div>
              <span className="font-black text-lg text-foreground">AuditorIA</span>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <NavLink href="/dashboard" label="Dashboard" icon="📊" />
            <NavLink href="/dashboard/audits" label="Auditorías" icon="📋" />
            <NavLink href="/dashboard/reports" label="Reportes" icon="📄" />
            <NavLink href="/dashboard/users" label="Usuarios" icon="👥" />
            <NavLink href="/dashboard/settings" label="Configuración" icon="⚙️" />
          </nav>

          {/* User menu */}
          <div className="px-4 py-4 border-t border-border space-y-3">
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground">{session.user?.name}</p>
              <p className="truncate">{session.user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ redirectTo: '/' })}
              className="w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded transition"
          >
            ☰
          </button>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Workspace: <span className="font-medium text-foreground">Mi Workspace</span>
            </span>
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutContent>{children}</DashboardLayoutContent>
}

function NavLink({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded transition"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  )
}
