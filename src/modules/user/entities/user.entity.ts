import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { Column, Entity } from 'typeorm';

export const USER_TABLE_NAME = 'user';
@Entity({ name: USER_TABLE_NAME })
export class UserEntity extends DatabaseBaseEntity {
  @Column({ type: String, length: 100, unique: true, nullable: false })
  email: string;
  @Column({ type: 'text', length: 100, select: false, nullable: false })
  password: string;
}
