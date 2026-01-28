import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';

@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear publicación' })
  @ApiResponse({ status: 201, description: 'Post creado' })
  create(@Req() req, @Body() dto: CreatePostDto) {
    return this.postsService.create({
        userId: req.user.userId,
        message: dto.message,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Listar publicaciones' })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.postsService.findAll();
  }
}
