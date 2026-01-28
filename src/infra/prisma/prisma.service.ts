import { Injectable, OnModuleInit, OnModuleDestroy, Logger  } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createPrismaAdapter } from './prisma.setup';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private pool: Pool;

  constructor(configService: ConfigService) {
    const dbUrl = configService.getOrThrow<string>('DATABASE_URL');
    const { pool, adapter } = createPrismaAdapter(dbUrl);
    
    super({ adapter });
    this.pool = pool;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('PostgreSQL connected via Driver Adapter');
    } catch (error) {
      this.logger.error('Error connecting to DB', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}