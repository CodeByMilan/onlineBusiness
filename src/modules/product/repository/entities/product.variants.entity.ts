import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IProductVariants } from '../../interfaces/productVariants.interfaces';
import { BigIntTransformerPipe } from 'src/utils/bigIntTransformer';
import { Expose } from 'class-transformer';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';
import { PRODUCT_STATUS_ENUM } from 'src/common/constants/status.constants';
import { ProductEntity } from 'src/modules/product/repository/entities/product.entity';
import { InventoryEntity } from 'src/modules/inventory/repository/entities/inventory.entity';
import { OrderItemsEntity } from 'src/modules/order/repository/entities/order.items.entity';
import { CartItemsEntity } from 'src/modules/cart/repository/entities/cart.items.entity';

export const PRODUCT_VARIANT_TABLE_NAME = 'product_variants';
@Entity({ name: PRODUCT_VARIANT_TABLE_NAME })
export class ProductVariantEntity
  extends DatabaseBaseEntity
  implements IProductVariants
{
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'varchar', length: 50, nullable: true })
  size: string;
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string;
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  priceAdjustment: number;
  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'varchar',
    enum: PRODUCT_STATUS_ENUM,
    nullable: false,
    default: PRODUCT_STATUS_ENUM.AVAILABLE,
  })
  status: PRODUCT_STATUS_ENUM;

  //foreign keys
  @Column({
    unique: true,
    type: 'bigint',
    name: 'product_id',
    transformer: new BigIntTransformerPipe(),
  })
  productId: number;
  // Relations
  @ManyToOne(() => ProductEntity, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @OneToOne(() => InventoryEntity, (inventory) => inventory.variant)
  inventory: InventoryEntity;

  @OneToMany(() => OrderItemsEntity, (orderItem) => orderItem.variant)
  orderItems: OrderItemsEntity[];

  @OneToMany(() => CartItemsEntity, (cartItem) => cartItem.variant)
  cartItems: CartItemsEntity[];
}
