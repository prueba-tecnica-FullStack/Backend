import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(params: { userId: number; message: string }) {
    const { userId, message } = params;

    return this.prisma.post.create({
      data: {
        message,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }
}
