import { Expose } from 'class-transformer';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';
import { ProductEntity } from 'src/modules/product/repository/entities/product.entity';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { BigIntTransformerPipe } from 'src/utils/bigIntTransformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IWishlist } from '../../interfaces/wishlist.interface';

export const WISHLIST_TABLE_NAME = 'wishlist';
@Entity({ name: WISHLIST_TABLE_NAME })
export class WishlistEntity extends DatabaseBaseEntity implements IWishlist {
  // foreign key
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
  @ManyToOne(() => UserEntity, (user) => user.wishlist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.wishlist, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
