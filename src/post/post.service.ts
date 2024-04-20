import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto, updatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PayloadToken } from 'src/auth/models/token.model';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private PostRepo: Repository<Post>,
    @InjectRepository(User) private UserRepo: Repository<User>,
  ) {}

  async create(data: CreatePostDto, author: PayloadToken) {
    const User = await this.UserRepo.findOne({ where: { id: author.sub } });
    if (!User) {
      throw new BadRequestException('Debe iniciar sesion para crear un post');
    }
    const post = this.PostRepo.create(data);
    post.author = User;
    return this.PostRepo.save(post);
  }

  findAll() {
    return this.PostRepo.find({ relations: ['author'] });
  }

  async findOne(id: number) {
    const Post = await this.PostRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!Post) {
      throw new BadRequestException('Post no encontrado');
    }
    return Post;
  }

  async update(id: number, data: updatePostDto) {
    const Post = await this.findOne(id);
    this.PostRepo.merge(Post, data);
    return this.PostRepo.save(Post).catch((error) => {
      throw new BadRequestException(error.message);
    });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
