import { Expose } from 'class-transformer';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';
import { ProductEntity } from 'src/modules/product/repository/entities/product.entity';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { BigIntTransformerPipe } from 'src/utils/bigIntTransformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IReview } from '../../interfaces/review.interface';

export const REVIEW_TABLE_NAME = 'review';
@Entity({ name: REVIEW_TABLE_NAME })
export class ReviewEntity extends DatabaseBaseEntity implements IReview {
  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  title: string;
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'int' })
  rating: number;
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'text', nullable: true })
  comment: string;

  //foreign key
  @Expose({ groups: ALL_GROUP })
  @Column({
    nullable: false,
    unique: true,
    type: 'bigint',
    name: 'user_id',
    transformer: new BigIntTransformerPipe(),
  })
  userId: number;
  @Expose({ groups: ALL_GROUP })
  @Column({
    nullable: false,
    unique: true,
    type: 'bigint',
    name: 'product_id',
    transformer: new BigIntTransformerPipe(),
  })
  productId: number;

  // Relations
  @ManyToOne(() => ProductEntity, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
