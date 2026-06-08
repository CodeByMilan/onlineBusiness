import { AuthJwtAccessGuard } from "../../../common/auth/guards/jwt-access/auth.jwt-access.guard";

/* 


*/
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
    if (options?.isSuperAdmin) {
      decorators.push(ProtectSuperAdminGuard);
    }
    return applyDecorators(UseGuards(...decorators));
  }