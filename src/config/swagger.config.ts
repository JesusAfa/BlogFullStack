import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('API')
  .setDescription('Documentacion de la api de BlogFuLLStack con NestJS ')
  .setVersion('1.0')
  .addTag('BlogFullStack')
  .build();
