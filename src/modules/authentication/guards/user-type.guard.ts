import { CanActivate, ExecutionContext, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import IRequest from "src/common/request/interfaces/request.interface";
import { USER_TYPE } from "src/modules/user/interfaces/user.interfaces";
import { UserEntity } from "src/modules/user/repositoy/entities/user.entity";

@Injectable()
export class UserTypeGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IRequest = context.switchToHttp().getRequest<IRequest>();
    const __user: UserEntity = request.__user;

    if (!__user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Not Authorized!',
      });
    }
    const url = request.url;

    const currentContext = url.split('/').filter((item) => item !== '')[0];

    const userType: USER_TYPE = __user.type;

    switch (currentContext) {
      case 'admin': {
        if (! USER_TYPE.ADMIN.includes(userType)) {
          throw new NotFoundException({
            statusCode: HttpStatus.FORBIDDEN,
            message: 'User not permitted',
          });
        }
        break;
      }
      case 'user': {
        break;
      }
      default: {
        throw new NotFoundException({
          statusCode: HttpStatus.FORBIDDEN,
          message: 'User not permitted',
        });
      }
    }

    return true;
  }
}