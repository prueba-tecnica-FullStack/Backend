import { PrismaClient } from '@prisma/client';
import { adapter, pool } from '../src/infra/prisma/prisma.setup';

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: 'leo@example.com',
      password: 'leo_password_1',
      posts: {
        create: [
          { message: 'Holaaaa Soy Leo ' },
          { message: 'aqui estoy probando los posts' },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      email: 'richard@example.com',
      password: 'richard_password_2',
      posts: {
        create: [{ message: 'Holaaa soy Richard!' }],
      },
    },
  });

  console.log('✅ Database seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
