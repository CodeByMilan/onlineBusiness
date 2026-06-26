import { Expose } from 'class-transformer';
import { PRODUCT_STATUS_ENUM } from 'src/common/constants/status.constants';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';

import { BigIntTransformerPipe } from 'src/utils/bigIntTransformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IInventory } from '../../interfaces/inventory.interface';
import { ProductVariantEntity } from 'src/modules/product/repository/entities/product.variants.entity';

export const INVENTORY_TABLE_NAME = 'inventory';
@Entity({ name: INVENTORY_TABLE_NAME })
export class InventoryEntity extends DatabaseBaseEntity implements IInventory {
  @Column({ type: 'int', default: 0 })
  quantity: number;
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
    name: 'variant_id',
    transformer: new BigIntTransformerPipe(),
  })
  variantId: number;
  // Relations
  @OneToOne(() => ProductVariantEntity, (variant) => variant.inventory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariantEntity;
}
