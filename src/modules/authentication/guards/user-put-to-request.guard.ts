import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import IRequest from 'src/common/request/interfaces/request.interface';
import { AuthenticationAdminService } from '../services/authentication.admin.service';
import { UserEntity } from 'src/modules/user/repositoy/entities/user.entity';

@Injectable()
export class UserPutToRequestGuard implements CanActivate {
  constructor(private authService: AuthenticationAdminService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<IRequest & { __user: any }>();

    const user: { id: number } | undefined = request?.user;

    if (!user || !user?.id) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Not Authorized!',
      });
    }

    const userFromDb: UserEntity | null =
      await this.authService.getUserForRequest(user.id);

    this.validateUser(userFromDb);

    request['__user'] = userFromDb;

    return true;
  }

  validateUser(user: UserEntity | null) {
    try {
      if (!user) throw new Error('Cannot find user');
    } catch (error) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }
}
