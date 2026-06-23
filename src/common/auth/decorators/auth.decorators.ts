import { UserPutToRequestGuard } from 'src/modules/authentication/guards/user-put-to-request.guard';
import { AuthJwtAccessGuard } from '../guards/jwt-access/auth.jwt-access.guard';
import { UserTypeGuard } from 'src/modules/authentication/guards/user-type.guard';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import IRequest from 'src/common/request/interfaces/request.interface';

/* 
simply combines multiple guards into one guard 
first AuthJwtAccessGuard checks the JwtToken and validate it and puts the user id in request 
secondly UserPutToRequestGuard  extracts the user details from the database and keep the user details in request._user
thirdly UserTypeGuard splits the url and checks if the url user type matches the login user type and processed forward

*/
export function UserProtected(options?: {
  addRole?: boolean;
}): MethodDecorator {
  const decorators: any[] = [
    AuthJwtAccessGuard,
    UserPutToRequestGuard,
    UserTypeGuard,
  ];

  return applyDecorators(UseGuards(...decorators));
}

export const GetUser = createParamDecorator(
  (returnPlain: boolean, ctx: ExecutionContext): UserEntity => {
    const req = ctx
      .switchToHttp()
      .getRequest<IRequest & { __user: UserEntity }>();
    return returnPlain ? req.__user : req.__user;
  },
);
