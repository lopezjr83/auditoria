import { prisma } from '@/lib/prisma'

async function main() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'lopezjr@visionproces.com' }
    })

    if (user) {
      console.log('✅ Usuario encontrado en BD:')
      console.log('ID:', user.id)
      console.log('Email:', user.email)
      console.log('Name:', user.name)
      console.log('Password (hashed):', user.password?.substring(0, 20) + '...')
      console.log('Email Verified:', user.emailVerified)
    } else {
      console.log('❌ Usuario NO encontrado en BD')
    }

    // Contar total de usuarios
    const total = await prisma.user.count()
    console.log('\nTotal de usuarios en BD:', total)

    // Listar todos los usuarios
    const allUsers = await prisma.user.findMany({
      select: { id: true, email: true, name: true }
    })
    console.log('\nTodos los usuarios:')
    allUsers.forEach(u => console.log(`  - ${u.email} (${u.name})`))

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
