import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  ADMIN_ONLY_GROUP,
  ALL_GROUP,
} from 'src/database/constant/serialization-group.constant';
import { BigIntTransformerPipe } from 'src/utils/bigIntTransformer';

import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DatabaseBaseEntity extends BaseEntity {
  @ApiProperty()
  @Generated()
  @Expose({ groups: ALL_GROUP })
  @PrimaryColumn({
    type: 'bigint',
    transformer: new BigIntTransformerPipe(),
  })
  id: number;
  @Expose({ groups: ALL_GROUP })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
  @Expose({ groups: ADMIN_ONLY_GROUP })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
  @Expose({ groups: ADMIN_ONLY_GROUP })
  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt: Date;
}
