import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { EntityManager } from 'typeorm';

export interface ICreateOptions {
  entityManager?: EntityManager;
  user?: UserEntity;
}
