import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();

const roleRules: { [key: string]: (request: any) => boolean } = {
  admin: (request: any) => request.headers.authorization === 'Bearer b3ZJ24IUFuoGUP',
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    return roles.map((role) => roleRules[role](request)).some((isActivate) => isActivate === true);
  }
}
