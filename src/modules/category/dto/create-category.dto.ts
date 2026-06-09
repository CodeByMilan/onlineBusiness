import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '../interfaces/category.interface';

export class CreateCategoryDto implements Partial<ICategory> {
  @ApiProperty({
    required: true,
    example: 'Traditional Wear',
  })
  name: string;
}
