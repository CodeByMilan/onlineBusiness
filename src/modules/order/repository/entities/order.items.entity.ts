import { Expose } from 'class-transformer';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';
import { ProductVariantEntity } from 'src/modules/product/repository/entities/product.variants.entity';
import { BigIntTransformerPipe } from 'src/utils/bigIntTransformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ORDER_STATUS } from '../../interfaces/order.interface';
import { IOrderItems } from '../../interfaces/order.items.interface';
import { OrderEntity } from './order.entity';

export const ORDER_ITEMS_TABLE_NAME = 'order_items';
@Entity({ name: ORDER_ITEMS_TABLE_NAME })
export class OrderItemsEntity
  extends DatabaseBaseEntity
  implements IOrderItems
{
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'int', default: 0 })
  quantity: number;
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  unitPrice: number;

  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'enum', length: 50, default: ORDER_STATUS.PENDING })
  status: ORDER_STATUS;

  //foreign key
  @Expose({ groups: ALL_GROUP })
  @Column({
    unique: true,
    type: 'bigint',
    name: 'variant_id',
    transformer: new BigIntTransformerPipe(),
  })
  variantId: string;
  @Expose({ groups: ALL_GROUP })
  @Column({
    unique: true,
    type: 'bigint',
    name: 'order_id',
    transformer: new BigIntTransformerPipe(),
  })
  OrderId: string;

  // Relations
  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => ProductVariantEntity, (variant) => variant.orderItems, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariantEntity;
}
