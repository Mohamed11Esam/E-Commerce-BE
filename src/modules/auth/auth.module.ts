import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMongoModule } from '@shared/index';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/filters';

@Module({
  imports: [
    UserMongoModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
