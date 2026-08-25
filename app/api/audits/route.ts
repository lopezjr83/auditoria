import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAudits, createAudit } from '@/lib/mock-db'
import { Audit } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, type, startDate, description } = await request.json()

    if (!title || !type || !startDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const audit: Audit = {
      id: `aud-${Date.now()}`,
      title,
      type,
      startDate: new Date(startDate),
      status: 'DRAFT',
      description,
      createdBy: session.user.id!,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    createAudit(audit)
    return NextResponse.json(audit, { status: 201 })
  } catch (error) {
    console.error('Create audit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(_request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const audits = getAudits()
    return NextResponse.json(audits)
  } catch (error) {
    console.error('Get audits error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
