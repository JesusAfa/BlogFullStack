import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { enviroments } from 'enviroments';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    AppModule,
    PostModule,
  ],
})
export class AppModule {}
