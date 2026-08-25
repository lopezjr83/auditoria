import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    const email = 'lopezjr@visionproces.com'
    const password = '123456789'
    const name = 'López Jr'

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('❌ El usuario ya existe:', email)
      console.log('ID:', existingUser.id)
      return
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        emailVerified: new Date(),
      }
    })

    console.log('✅ Superusuario creado exitosamente')
    console.log('═'.repeat(50))
    console.log('Email:', email)
    console.log('Contraseña temporal:', password)
    console.log('ID:', user.id)
    console.log('═'.repeat(50))
    console.log('⚠️ IMPORTANTE: Cambiar esta contraseña inmediatamente después de ingresar')

  } catch (error) {
    console.error('❌ Error creando superusuario:')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
