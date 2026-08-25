import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAudit, updateAudit, deleteAudit } from '@/lib/mock-db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const audit = getAudit(params.id)
    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 })
    }

    return NextResponse.json(audit)
  } catch (error) {
    console.error('Get audit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updates = await request.json()
    const audit = updateAudit(params.id, updates)

    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 })
    }

    return NextResponse.json(audit)
  } catch (error) {
    console.error('Update audit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const deleted = deleteAudit(params.id)
    if (!deleted) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Audit deleted' })
  } catch (error) {
    console.error('Delete audit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
