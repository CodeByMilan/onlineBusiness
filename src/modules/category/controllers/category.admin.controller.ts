import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../repository/entities/category.entity';
import { ApiDocs } from 'src/common/doc/common-docs';
import { ResponseMessage } from 'src/common/response/decorators/responseMessage.decorators';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { CategoryAdminService } from '../services/category.admin.service';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import {
  GetUser,
  UserProtected,
} from 'src/common/auth/decorators/auth.decorators';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { DataSource } from 'typeorm';

@ApiTags('Category')
@Controller('category')
export class CategoryAdminController {
  constructor(
    private readonly categoryAdminService: CategoryAdminService,
    private readonly connection: DataSource,
  ) {}

  @ApiDocs({
    operation: 'Create Category.',
  })
  @UserProtected()
  @ResponseMessage('Category created successfully.')
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: UserEntity,
  ): Promise<IResponse<CategoryEntity>> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const data: CategoryEntity = await this.categoryAdminService.create(
        createCategoryDto,
        {
          entityManager: queryRunner.manager,
          user,
        },
      );
      await queryRunner.commitTransaction();
      return { data };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @ApiDocs({
    operation: 'delete category',
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('category  deleted successfully.')
  @Delete('/:id')
  async deleteCategoryById(
    @Param('id') id: number,
  ): Promise<IResponse<CategoryEntity>> {
    const found: CategoryEntity | null =
      await this.categoryAdminService.getById(id);
    if (!found) throw new NotFoundException('Cannot find category');

    const data = await this.categoryAdminService.delete(found);
    return { data };
  }
}
