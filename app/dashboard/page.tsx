'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-foreground mb-2">
          Bienvenido, {session?.user?.name}
        </h1>
        <p className="text-muted-foreground">
          Gestiona tus auditorías, hallazgos y reportes en un solo lugar.
        </p>
      </div>

      {/* Quick stats (mock) */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard label="Auditorías activas" value="0" />
        <StatCard label="Hallazgos totales" value="0" />
        <StatCard label="CAPs pendientes" value="0" />
        <StatCard label="Tasa cumplimiento" value="—" />
      </div>

      {/* CTA */}
      <div className="bg-primary/5 border-2 border-primary rounded-lg p-8 text-center">
        <h2 className="text-2xl font-black text-foreground mb-4">
          Comienza tu primera auditoría
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Crea una nueva auditoría SMETA, ISO o personalizada, y comienza a capturar hallazgos.
        </p>
        <Link
          href="/dashboard/audits/create"
          className="inline-flex px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition"
        >
          + Nueva auditoría
        </Link>
      </div>

      {/* Recent audits */}
      <div>
        <h2 className="text-2xl font-black text-foreground mb-4">Auditorías recientes</h2>
        <div className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground">
          <p>No hay auditorías aún. Crea una para comenzar.</p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className="text-3xl font-black text-foreground">{value}</p>
    </div>
  )
}
