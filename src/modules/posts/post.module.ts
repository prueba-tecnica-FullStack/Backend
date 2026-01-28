import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService,  PrismaService, JwtStrategy]
})
export class PostsModule {}
