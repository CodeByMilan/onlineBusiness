import { Expose } from 'class-transformer';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { BigIntTransformerPipe } from 'src/utils/bigIntTransformer';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import {
    IOrder,
    ORDER_STATUS,
    PAYMENT_METHOD,
} from '../../interfaces/order.interface';
import { OrderItemsEntity } from './order.items.entity';

export const ORDER_TABLE_NAME = 'order';
@Entity({ name: ORDER_TABLE_NAME })
export class OrderEntity extends DatabaseBaseEntity implements IOrder {
  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'enum',
    length: 50,
    nullable: false,
    default: ORDER_STATUS.PENDING,
  })
  status: ORDER_STATUS;
  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'decimal',
    nullable: false,
    precision: 10,
    scale: 2,
    default: 0,
  })
  totalAmount: number;
  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'enum',
    length: 50,
    nullable: false,
    default: PAYMENT_METHOD.CASH,
  })
  paymentMethod: PAYMENT_METHOD;

  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'text', nullable: true })
  shippingAddress: string;
  //foreign key
  @Expose({ groups: ALL_GROUP })
  @Column({
    nullable: false,
    unique: true,
    type: 'bigint',
    name: 'user_id',
    transformer: new BigIntTransformerPipe(),
  })
  userId: string;
  // Relations
  @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => OrderItemsEntity, (orderItem) => orderItem.order)
  items: OrderItemsEntity[];
}
