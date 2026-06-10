import { Expose } from 'class-transformer';
import { PRODUCT_STATUS_ENUM } from 'src/common/constants/status.constants';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';
import { Column, Entity } from 'typeorm';
import { IProduct } from '../../interfaces/product.interface';

export const PRODUCT_TABLE_NAME = 'product';
@Entity({ name: PRODUCT_TABLE_NAME })
export class ProductEntity extends DatabaseBaseEntity implements IProduct {
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'float', nullable: false })
  price: number;
  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'varchar',
    enum: PRODUCT_STATUS_ENUM,
    nullable: false,
    default: PRODUCT_STATUS_ENUM.AVAILABLE,
  })
  status: PRODUCT_STATUS_ENUM;
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'text', nullable: true })
  description: string;
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'int', length: 255, nullable: true })
  quantity: number;
}
