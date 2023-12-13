import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '@shared/enum/userRoles.enum';

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    //Si no se necesita rol
    if (!role) return true;

    const { user } = context.switchToHttp().getRequest();

    //Si el usuario es admin, está autorizado directamente.
    if (user.role === UserRoles.ADMIN) return true;

    return role === user.role;
  }
}
