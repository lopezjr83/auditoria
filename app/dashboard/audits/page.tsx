'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useState } from 'react'

// Mock data — será reemplazado con BD real
const MOCK_AUDITS = [
  {
    id: 'aud-001',
    title: 'SMETA ACME Corp 2026-01',
    type: 'SMETA',
    status: 'EN_PROGRESO',
    startDate: '2026-01-15',
    hallazgos: 5,
    critical: 1,
    major: 2,
  },
  {
    id: 'aud-002',
    title: 'ISO 9001 TechStart',
    type: 'ISO_9001',
    status: 'COMPLETADA',
    startDate: '2025-12-20',
    hallazgos: 3,
    critical: 0,
    major: 1,
  },
]

export default function AuditsPage() {
  const [audits] = useState(MOCK_AUDITS)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-foreground">Auditorías</h1>
          <p className="text-muted-foreground">Gestiona todas tus auditorías en un solo lugar</p>
        </div>
        <Link
          href="/dashboard/audits/create"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition"
        >
          + Nueva auditoría
        </Link>
      </div>

      {/* Audits list */}
      {audits.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No hay auditorías aún</p>
          <Link
            href="/dashboard/audits/create"
            className="inline-flex px-6 py-2 bg-primary text-primary-foreground rounded font-bold hover:opacity-90 transition"
          >
            Crear primera auditoría
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {audits.map((audit) => (
            <Link
              key={audit.id}
              href={`/dashboard/audits/${audit.id}`}
              className="block bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:bg-muted/30 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{audit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {audit.type} • Iniciada {audit.startDate}
                  </p>
                </div>
                <StatusBadge status={audit.status} />
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                <div className="text-sm">
                  <span className="text-muted-foreground">Hallazgos: </span>
                  <span className="font-bold text-foreground">{audit.hallazgos}</span>
                </div>
                {audit.critical > 0 && (
                  <div className="text-sm">
                    <span className="text-destructive font-bold">🔴 Critical: {audit.critical}</span>
                  </div>
                )}
                {audit.major > 0 && (
                  <div className="text-sm">
                    <span className="text-warning font-bold">🟠 Major: {audit.major}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    DRAFT: 'bg-muted text-muted-foreground',
    EN_PROGRESO: 'bg-info/20 text-info',
    COMPLETADA: 'bg-success/20 text-success',
    CANCELADA: 'bg-destructive/20 text-destructive',
  }

  const labels = {
    DRAFT: 'Borrador',
    EN_PROGRESO: 'En progreso',
    COMPLETADA: 'Completada',
    CANCELADA: 'Cancelada',
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${
        colors[status as keyof typeof colors] || colors.DRAFT
      }`}
    >
      {labels[status as keyof typeof labels] || status}
    </span>
  )
}
