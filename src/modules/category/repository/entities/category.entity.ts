import { Expose } from 'class-transformer';
import { STATUS_ENUM } from 'src/common/constants/status.constants';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/database/constant/serialization-group.constant';
import { Column, Entity } from 'typeorm';
import { ICategory } from '../../interfaces/category.interface';

export const CATEGORY_TABLE_NAME = 'category';
@Entity({ name: CATEGORY_TABLE_NAME })
export class CategoryEntity extends DatabaseBaseEntity implements ICategory {
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'varchar', length: 255 ,nullable:false})
  name: string;
  @Expose({ groups: ALL_GROUP })
  @Column({ type: 'varchar', length: 255,nullable:true })
  slug: string;
  @Expose({ groups: ALL_GROUP })
  @Column({ type:'varchar', enum:STATUS_ENUM, default: STATUS_ENUM.ACTIVE ,nullable:false})
  status: STATUS_ENUM;
}
