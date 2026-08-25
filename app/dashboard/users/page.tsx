'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface User {
  id: string
  name: string
  email: string
  role: 'OWNER' | 'ADMIN' | 'AUDITOR' | 'SUPERVISOR' | 'VIEWER'
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE'
  joinedAt: string
}

const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'María García',
    email: 'maria@auditoria.app',
    role: 'OWNER',
    status: 'ACTIVE',
    joinedAt: '2026-01-01',
  },
  {
    id: 'user-2',
    name: 'Juan López',
    email: 'juan@auditoria.app',
    role: 'AUDITOR',
    status: 'ACTIVE',
    joinedAt: '2026-01-10',
  },
]

const STATUS_COLORS: Record<User['status'], string> = {
  ACTIVE: 'bg-success/10 text-success',
  PENDING: 'bg-warning/10 text-warning',
  INACTIVE: 'bg-destructive/10 text-destructive',
}

export default function UsersPage() {
  const [users] = useState<User[]>(MOCK_USERS)
  const [showInviteForm, setShowInviteForm] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black mb-2">Usuarios</h1>
          <p className="text-muted-foreground">Gestiona miembros de tu workspace</p>
        </div>
        <Button onClick={() => setShowInviteForm(!showInviteForm)}>
          + Invitar
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-6 py-3 font-semibold">Usuario</th>
              <th className="text-left px-6 py-3 font-semibold">Email</th>
              <th className="text-left px-6 py-3 font-semibold">Rol</th>
              <th className="text-left px-6 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/30">
                <td className="px-6 py-3 font-medium">{user.name}</td>
                <td className="px-6 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-6 py-3 text-sm">{user.role}</td>
                <td className="px-6 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${STATUS_COLORS[user.status]}`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
