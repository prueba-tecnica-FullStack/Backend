import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export const createPrismaAdapter = (connectionString: string) => {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return { pool, adapter };
};