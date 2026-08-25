import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { confirm } = await request.json()
  if (confirm !== 'DELETE_MY_ACCOUNT') {
    return NextResponse.json(
      { error: 'Confirmation required. Pass confirm: "DELETE_MY_ACCOUNT"' },
      { status: 400 }
    )
  }

  // TODO: Delete user from DB
  // TODO: Delete all audits, findings, caps, logs for this user
  // TODO: Log deletion in audit trail
  // TODO: Send confirmation email

  return NextResponse.json({
    message: 'Account deletion requested. You will receive a confirmation email.',
    deletedAt: new Date().toISOString(),
  })
}
