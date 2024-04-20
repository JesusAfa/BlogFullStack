import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config/config';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbname, password, port } = configService.posgrest;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbname,
          synchronize: false,
          autoLoadEntities: true,
          timezone: '-05:00',
        };
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
