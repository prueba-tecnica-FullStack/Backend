import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './infra/prisma/prisma.service';
import { PostsModule } from './modules/posts/post.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string()
          .uri({ scheme: [/postgres/, /postgresql/] })
          .required(),
        PORT: Joi.number().default(3000),
      })
    }),
    AuthModule, PostsModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
