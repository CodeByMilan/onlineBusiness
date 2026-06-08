import { Exclude, Expose } from 'class-transformer';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { Column, Entity } from 'typeorm';
import { USER_TYPE } from '../interfaces/user.interfaces';
import {
  ADMIN_ONLY_GROUP,
  ALL_GROUP,
} from 'src/database/constant/serialization-group.constant';

export const USER_TABLE_NAME = 'user';
@Entity({ name: USER_TABLE_NAME })
export class UserEntity extends DatabaseBaseEntity {
  @Expose({ groups: ALL_GROUP })
  @Column({ type: String, length: 100, unique: true, nullable: false })
  email: string;
  @Exclude()
  @Column({ type: 'text', select: false, nullable: false })
  password: string;
  @Expose({ groups: ADMIN_ONLY_GROUP })
  @Column({ type: String, length: 50, nullable: true })
  type: USER_TYPE;
}
