import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    console.log('🔍 Testing credentials provider...')
    console.log('Email:', email)

    // 1. Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 401 })
    }

    console.log('✅ User found:', user.id)

    // 2. Check if user has password
    if (!user.password) {
      return Response.json({ error: 'User has no password (OAuth only)' }, { status: 401 })
    }

    console.log('✅ User has password hash')

    // 3. Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return Response.json({ error: 'Password does not match' }, { status: 401 })
    }

    console.log('✅ Password matches!')

    return Response.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

  } catch (error) {
    console.error('❌ Error in credentials test:', error)
    return Response.json({
      error: String(error),
      type: error instanceof Error ? error.constructor.name : 'Unknown'
    }, { status: 500 })
  }
}
