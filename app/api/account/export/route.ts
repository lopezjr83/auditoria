import { auth } from '@/lib/auth'
import { Response } from 'next/server'

export async function GET(req: Request) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Export datos del usuario
  const userData = {
    user: {
      id: 'user-id-from-db',
      name: session.user?.name,
      email: session.user?.email,
      image: session.user?.image,
      createdAt: new Date().toISOString(),
    },
    audits: [], // TODO: fetch from DB
    findings: [], // TODO: fetch from DB
    caps: [], // TODO: fetch from DB
    auditLogs: [], // TODO: fetch from DB
    exportedAt: new Date().toISOString(),
  }

  // Generar JSON
  const json = JSON.stringify(userData, null, 2)

  return new Response(json, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="auditoria-export-${Date.now()}.json"`,
    },
  })
}
