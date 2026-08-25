import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getFindings, createFinding } from '@/lib/mock-db'
import { Finding } from '@/types'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const findings = getFindings(id)
    return NextResponse.json(findings)
  } catch (error) {
    console.error('Get findings error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const { description, severity, standard, location } = await request.json()

    if (!description || !severity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const finding: Finding = {
      id: `find-${Date.now()}`,
      auditId: id,
      description,
      severity,
      standard,
      location,
      createdBy: session.user.id!,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    createFinding(finding)
    return NextResponse.json(finding, { status: 201 })
  } catch (error) {
    console.error('Create finding error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
