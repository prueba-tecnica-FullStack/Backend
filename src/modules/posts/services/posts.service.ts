import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(params: { postId: number; message: string, userId: number }) {
    const post = await this.prisma.post.findUnique({
      where: { id: params.postId},
    });

    if (!post) {
      throw new NotFoundException('Post no encontrado');
    }

    if (post.userId !== params.userId) {
      throw new NotFoundException('No puedes editar este post'); 
    }

    return this.prisma.post.update({
      where: { id: params.postId },
      data: { message: params.message },
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
