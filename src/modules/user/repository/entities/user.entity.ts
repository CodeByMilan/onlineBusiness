import { Exclude, Expose } from 'class-transformer';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import {
  IUser,
  USER_GENDER,
  USER_TYPE,
} from '../../interfaces/user.interfaces';
import {
  ADMIN_ONLY_GROUP,
  ALL_GROUP,
} from 'src/database/constant/serialization-group.constant';
import * as bcrypt from 'bcryptjs';
import { ProductEntity } from 'src/modules/product/repository/entities/product.entity';
import { CategoryEntity } from 'src/modules/category/repository/entities/category.entity';
import { OrderEntity } from 'src/modules/order/repository/entities/order.entity';
import { WishlistEntity } from 'src/modules/wishlist/repository/entities/wishlist.entity';
import { ReviewEntity } from 'src/modules/review/repository/entities/review.entity';

export const USER_TABLE_NAME = 'user';
@Entity({ name: USER_TABLE_NAME })
export class UserEntity extends DatabaseBaseEntity implements IUser {
  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
    name: 'email',
  })
  email: string;
  @Exclude()
  @Column({ type: 'text', select: false, nullable: false, name: 'password' })
  password: string;
  @Expose({ groups: ADMIN_ONLY_GROUP })
  @Column({
    type: 'varchar',
    enum: USER_TYPE,
    nullable: true,
    name: 'user_type',
  })
  type: USER_TYPE;

  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'varchar',
    length: 100,
    unique: false,
    nullable: true,
    name: 'first_name',
  })
  firstName?: string;

  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'varchar',
    length: 100,
    unique: false,
    nullable: true,
    name: 'last_name',
  })
  lastName?: string;

  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'varchar',
    length: 100,
    unique: false,
    nullable: true,
    name: 'user_name',
  })
  userName?: string;

  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
    nullable: true,
    name: 'phone_number',
  })
  phoneNumber: string;
  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'address',
  })
  address?: string;

  @Expose({ groups: ALL_GROUP })
  @Column({
    type: 'varchar',
    enum: USER_GENDER,
    nullable: true,
    name: 'gender',
  })
  gender?: USER_GENDER;

  //Relations
  @OneToMany(() => ProductEntity, (e) => e.user)
  product: ProductEntity[];

  @OneToMany(() => CategoryEntity, (e) => e.user)
  category: CategoryEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.user)
  wishlist: WishlistEntity[];

  //functions
  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswordBeforeInsertOrUpdate() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
