import { Expose } from 'class-transformer';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';
import { ProductVariantEntity } from 'src/modules/product/repository/entities/product.variants.entity';
import { BigIntTransformerPipe } from 'src/utils/bigIntTransformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ICartItems } from '../../interfaces/cart.items.interface';
import { CartEntity } from './cart.entity';

export const CART_ITEMS_TABLE_NAME = 'cart_items';
@Entity({ name: CART_ITEMS_TABLE_NAME })
export class CartItemsEntity extends DatabaseBaseEntity implements ICartItems {
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'int', nullable: true })
  quantity: number;
  //foreign key
  @Expose({ groups: ALL_GROUP })
  @Column({
    nullable: false,
    unique: true,
    type: 'bigint',
    name: 'cart_id',
    transformer: new BigIntTransformerPipe(),
  })
  cartId: number;
  @Expose({ groups: ALL_GROUP })
  @Column({
    nullable: false,
    unique: true,
    type: 'bigint',
    name: 'variant_id',
    transformer: new BigIntTransformerPipe(),
  })
  variantId: number;
  // Relations
  @ManyToOne(() => CartEntity, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @ManyToOne(() => ProductVariantEntity, (variant) => variant.cartItems, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariantEntity;
}
