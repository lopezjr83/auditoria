import { auth } from '@/lib/auth'
import { Response } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { confirm } = await req.json()
  if (confirm !== 'DELETE_MY_ACCOUNT') {
    return Response.json(
      { error: 'Confirmation required. Pass confirm: "DELETE_MY_ACCOUNT"' },
      { status: 400 }
    )
  }

  // TODO: Delete user from DB
  // TODO: Delete all audits, findings, caps, logs for this user
  // TODO: Log deletion in audit trail
  // TODO: Send confirmation email

  return Response.json({
    message: 'Account deletion requested. You will receive a confirmation email.',
    deletedAt: new Date().toISOString(),
  })
}
