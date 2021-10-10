import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailService } from './modules/mail/mail.service';
import { MailModule } from './modules/mail/mail.module';
import { MeModule } from './modules/me/me.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `deployment/config/${process.env.NODE_ENV}/.env`,
      expandVariables: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    MailModule,
    MeModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
