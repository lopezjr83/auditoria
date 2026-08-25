import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signIn } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return Response.json(
        { error: 'Email y contraseña requeridos' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return Response.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return Response.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    return Response.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return Response.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    )
  }
}
