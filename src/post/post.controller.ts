import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, updatePostDto } from './dto/create-post.dto';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Post')
@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Post()
  create(@Body() data: CreatePostDto, @Req() req: any) {
    const user = req.user as PayloadToken;
    console.log(user);
    return this.postService.create(data, user);
  }

  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.findOne(id);
  }

  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: updatePostDto) {
    return this.postService.update(id, data);
  }

  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
