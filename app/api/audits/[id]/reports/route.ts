import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAudit, getFindings } from '@/lib/mock-db'
import { Report } from '@/types'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { format = 'PDF' } = await request.json()

    const audit = getAudit(params.id)
    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 })
    }

    const findings = getFindings(params.id)

    const report: Report = {
      id: `rep-${Date.now()}`,
      auditId: params.id,
      title: `${audit.title} - Reporte ${new Date().toLocaleDateString()}`,
      format: format as any,
      generatedBy: session.user.id!,
      generatedAt: new Date(),
      data: {
        summary: `Auditoría: ${audit.title}\nTipo: ${audit.type}\nEstado: ${audit.status}`,
        findingsCount: findings.length,
        capsCount: 0,
        findings,
        caps: [],
      },
    }

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    console.error('Generate report error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
