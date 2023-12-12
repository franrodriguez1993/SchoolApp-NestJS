import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { UserRoles } from '@shared/enum/userRoles.enum';
import { AuthGuard } from '@shared/guard/auth.guard';
import { RolesAuthGuard } from '@shared/guard/roles-auth.guard';
import { Roles } from './roles.decorator';

//Guard auth + Guard roles
export function Auth(role: UserRoles) {
  return applyDecorators(
    SetMetadata('roles', role),
    Roles(role),
    UseGuards(AuthGuard, RolesAuthGuard),
  );
}
