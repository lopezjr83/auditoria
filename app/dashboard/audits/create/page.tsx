export const dynamic = 'force-dynamic'

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const AUDIT_TYPES = [
  { value: 'SMETA', label: 'SMETA (4 Pillars)', description: 'Auditoría de prácticas laborales, seguridad, ambiente y ética' },
  { value: 'ISO_9001', label: 'ISO 9001:2015', description: 'Sistema de Gestión de Calidad' },
  { value: 'ISO_14001', label: 'ISO 14001:2015', description: 'Sistema de Gestión Ambiental' },
  { value: 'ISO_45001', label: 'ISO 45001:2018', description: 'Sistema de Gestión de Seguridad y Salud' },
]

export default function CreateAuditPage() {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('SMETA')
  const [startDate, setStartDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type,
          startDate,
          status: 'DRAFT',
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Error al crear auditoría')
        return
      }

      const audit = await res.json()
      router.push(`/dashboard/audits/${audit.id}`)
    } catch (err) {
      setError('Error al crear auditoría')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link href="/dashboard/audits" className="text-primary hover:underline text-sm font-medium mb-4 inline-block">
          ← Volver
        </Link>
        <h1 className="text-4xl font-black text-foreground">Nueva auditoría</h1>
        <p className="text-muted-foreground">Selecciona el tipo y proporciona los detalles</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">1. Tipo de auditoría</h2>
          <div className="space-y-3">
            {AUDIT_TYPES.map((auditType) => (
              <label key={auditType.value} className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-muted/30 transition" style={{borderColor: type === auditType.value ? '#0066cc' : '#e5e7eb'}}>
                <input
                  type="radio"
                  name="type"
                  value={auditType.value}
                  checked={type === auditType.value}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 w-5 h-5"
                />
                <div>
                  <p className="font-bold text-foreground">{auditType.label}</p>
                  <p className="text-sm text-muted-foreground">{auditType.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">2. Detalles</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Título *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ej. SMETA ACME Corp 2026-01"
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Fecha de inicio *
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading || !title || !startDate}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? 'Creando...' : 'Crear auditoría'}
          </button>
          <Link
            href="/dashboard/audits"
            className="px-6 py-3 border-2 border-border text-foreground rounded-lg font-bold hover:bg-muted transition"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
