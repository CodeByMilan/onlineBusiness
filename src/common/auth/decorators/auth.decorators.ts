import { UserPutToRequestGuard } from 'src/modules/authentication/guards/user-put-to-request.guard';
import { AuthJwtAccessGuard } from '../guards/jwt-access/auth.jwt-access.guard';
import { UserTypeGuard } from 'src/modules/authentication/guards/user-type.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function UserProtected(options?: {
  isRefresh?: boolean;
  addRole?: boolean;
  isSuperAdmin?: boolean;
}): MethodDecorator {
  const decorators: any[] = [
    AuthJwtAccessGuard,
    UserPutToRequestGuard,
    UserTypeGuard,
  ];

  return applyDecorators(UseGuards(...decorators));
}
