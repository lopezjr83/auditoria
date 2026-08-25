import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createGuestToken, getGuestTokensByAudit } from '@/lib/mock-db'
import { GuestToken } from '@/types'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tokens = getGuestTokensByAudit(id)
    return NextResponse.json(tokens)
  } catch (error) {
    console.error('Get guest tokens error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { accessType, guestEmail, guestName, durationDays = 7 } = await request.json()

    // Generar token único (8 caracteres)
    const token = Math.random().toString(36).substr(2, 8).toUpperCase()

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + durationDays)

    const guestToken: GuestToken = {
      id: `gt-${Date.now()}`,
      token,
      auditId: id,
      accessType,
      guestEmail,
      guestName,
      permissions: ['view_audit', 'add_finding'],
      expiresAt,
      createdBy: session.user.id!,
      createdAt: new Date(),
    }

    createGuestToken(guestToken)
    return NextResponse.json(guestToken, { status: 201 })
  } catch (error) {
    console.error('Create guest token error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
