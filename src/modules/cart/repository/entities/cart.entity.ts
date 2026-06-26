import { Expose } from 'class-transformer';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { BigIntTransformerPipe } from 'src/utils/bigIntTransformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ICart } from '../../interfaces/cart.interface';
import { OrderItemsEntity } from 'src/modules/order/repository/entities/order.items.entity';
import { CartItemsEntity } from './cart.items.entity';

export const CART_TABLE_NAME = 'cart';
@Entity({ name: CART_TABLE_NAME })
export class CartEntity extends DatabaseBaseEntity implements ICart {
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
  // Relations
  @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @OneToMany(() => CartItemsEntity, (cartItem) => cartItem.cart)
  items: CartItemsEntity[];
}
