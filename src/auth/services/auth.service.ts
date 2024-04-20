import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { PayloadToken } from '../models/token.model';
import { User } from '../../users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user;
        return rta;
      }
      return null;
    }
  }

  async generateJwt(user: User) {
    const payload: PayloadToken = {
      role: user.role.name_role.toString(),
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
