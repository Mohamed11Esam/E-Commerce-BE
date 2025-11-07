import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMongoModule } from '@shared/index';
import { AuthFactory } from './factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserMongoModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthFactory,JwtService],
})
export class AuthModule {}
