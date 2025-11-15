import { Injectable, CanActivate, ExecutionContext, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {  UserRepository } from '@models/index';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const payload = this.jwtService.verify<{
      _id: string;
      role: string;
      email: string;
    }>(authorization, { secret: this.configService.get('JWT_SECRET') });
    const user = await this.userRepository.findOne({ _id: payload._id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    request.user = user;
    return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
