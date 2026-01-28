import { PrismaClient } from '@prisma/client';
import { createPrismaAdapter } from '../src/infra/prisma/prisma.setup';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('DATABASE_URL not found in .env');

  const { pool, adapter } = createPrismaAdapter(dbUrl);
  const prisma = new PrismaClient({ adapter });

  const DEFAULT_PASSWORD = 'password123';
  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  try {
    console.log('Starting database seeding...');

    await prisma.post.deleteMany();
    await prisma.user.deleteMany();


    await prisma.user.create({
      data: {
        email: 'leo@example.com',
        password: hashedPassword,
        posts: {
          create: [
            { message: 'Holaaaa Soy Leo' },
            { message: 'Aquí estoy probando los posts' },
          ],
        },
      },
    });

    await prisma.user.create({
      data: {
        email: 'richard@example.com',
        password: hashedPassword,
        posts: {
          create: [{ message: 'Holaaa soy Richard!' }],
        },
      },
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main()
