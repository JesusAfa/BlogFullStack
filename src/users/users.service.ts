import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { roles } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(roles) private roleRepository: Repository<roles>,
  ) {}
  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);
    const hashPassword = await bcrypt.hash(newUser?.password, 10);
    newUser.password = hashPassword;
    const role = await this.roleRepository.findOne({
      where: { id: 2 },
    });
    newUser.role = role;
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOne(id);
    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }

    user.email = data?.email;
    return await this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
