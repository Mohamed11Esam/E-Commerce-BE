
import { ROLES, Roles } from '@common/decorators';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.getAllAndMerge(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles.includes(request.user.role)) {
      throw new UnauthorizedException('Not allowed');
    }
    return true
  }
}
