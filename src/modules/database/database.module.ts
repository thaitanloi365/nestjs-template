import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import { types } from 'pg';
import moment from 'moment';
import ormconfig from './ormconfig';

const parser = (value: string): Date => {
  return moment.utc(value).toDate();
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ConnectionOptions => {
        types.setTypeParser(types.builtins.DATE, parser);
        return ormconfig;
      },
    }),
  ],
})
export class DatabaseModule {}
