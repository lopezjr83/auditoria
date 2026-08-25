import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAuditLogs } from '@/lib/mock-db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const logs = getAuditLogs(params.id)
    return NextResponse.json(logs)
  } catch (error) {
    console.error('Get audit logs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
