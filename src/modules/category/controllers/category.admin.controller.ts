import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../repository/entities/category.entity';
import { ApiDocs } from 'src/common/doc/common-docs';
import { ResponseMessage } from 'src/common/response/decorators/responseMessage.decorators';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { CategoryAdminService } from '../services/category.admin.service';

ApiTags('category');
@Controller('category')
export class CategoryAdminController {
  constructor(private readonly categoryAdminService: CategoryAdminService) {}
  @ApiDocs({
    operation: 'Create Category.',
  })
  @ResponseMessage('Category created successfully.')
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<IResponse<CategoryEntity>> {
    try {
      const data: CategoryEntity =
        await this.categoryAdminService.create(createCategoryDto);
      return { data };
    } catch (error) {
      throw error;
    }
  }

}
