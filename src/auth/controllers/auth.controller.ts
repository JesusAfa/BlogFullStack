import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';
import { ApiKeyGuard } from '../guards/api-key.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'), ApiKeyGuard)
  @ApiBody({
    description: 'Iniciar sesión en la aplicación',
    schema: {
      type: 'object',
      properties: {
        // Aquí puedes describir las propiedades del cuerpo de la petición
        // Por ejemplo:
        username: { type: 'string', example: 'usuario' },
        password: { type: 'string', example: 'contraseña' },
      },
    },
  })
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJwt(user);
  }
}
