import { UserEntity } from 'src/modules/user/repository/entities/user.entity';

export default interface IRequest extends Request {
  __user: UserEntity;
  user?: { id: number };
}
