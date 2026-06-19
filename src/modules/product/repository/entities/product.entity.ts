import { Expose } from 'class-transformer';
import { PRODUCT_STATUS_ENUM } from 'src/common/constants/status.constants';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { IProduct } from '../../interfaces/product.interface';
import { UserEntity } from 'src/modules/user/repositoy/entities/user.entity';
import { BigIntTransformerPipe } from 'src/utils/bigIntTransformer';
import { CategoryEntity } from 'src/modules/category/repository/entities/category.entity';

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
  @Column({ type: 'int', nullable: true })
  quantity: number;

  //foreign keys
  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'bigint',
    name: 'user_id',
    transformer: new BigIntTransformerPipe(),
  })
  userId: number;
  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'bigint',
    name: 'category_id',
    transformer: new BigIntTransformerPipe(),
  })
  categoryId: number;

  //Relations
  @ManyToOne(() => UserEntity, (user) => user.product, {
    cascade: false,
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToOne(() => CategoryEntity, (category) => category.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'category_id',
  })
  category?: CategoryEntity;
}
