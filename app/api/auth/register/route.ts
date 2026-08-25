import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(_req: Request) {
  try {
    const { email, name, password } = await req.json()

    // Validaciones
    if (!email || !password || !name) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return Response.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return Response.json(
        { error: 'Email already in use' },
        { status: 409 }
      )
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    return Response.json(
      { user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Register error:', error)
    return Response.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
