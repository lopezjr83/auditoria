const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'lopezjr@visionproces.com' }
    });
    console.log('✓ User found:', user?.email, 'Role:', user?.role);
  } catch (error) {
    console.error('✗ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
