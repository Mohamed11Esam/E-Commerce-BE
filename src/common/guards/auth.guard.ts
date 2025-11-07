import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerRepository } from '@models/index';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const payload = this.jwtService.verify<{
      _id: string;
      role: string;
      email: string;
    }>(authorization, { secret: this.configService.get('JWT_SECRET') });
    const user = await this.customerRepository.findOne({ _id: payload._id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    request.user = user;
    return true;
  }
}
