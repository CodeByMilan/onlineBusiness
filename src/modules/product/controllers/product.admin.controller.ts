import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductAdminService } from '../services/product.admin.service';
import { ApiDocs } from 'src/common/doc/common-docs';
import { ResponseMessage } from 'src/common/response/decorators/responseMessage.decorators';
import { CreateProductDto } from '../dto/create-product.dto';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { ProductEntity } from '../repository/entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
import {
  GetUser,
  UserProtected,
} from 'src/common/auth/decorators/auth.decorators';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
@ApiTags('Product')
@Controller('product')
export class ProductAdminController {
  constructor(
    private readonly productAdminService: ProductAdminService,
    private readonly connection: DataSource,
  ) {}

  @ApiDocs({
    operation: 'Create new Product',
  })
  @UserProtected()
  @ResponseMessage('Product created successfully.')
  @Post()
  async create(
    @Body() body: CreateProductDto,
    @GetUser() user: UserEntity,
  ): Promise<IResponse<ProductEntity>> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const data: ProductEntity = await this.productAdminService.create(body, {
        entityManager: queryRunner.manager,
        user,
      });
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
    operation: 'List all Product',
  })
  @ResponseMessage('Product list retrieved successfully.')
  @Get()
  async list(): Promise<IResponse<ProductEntity[]>> {
    const data = await this.productAdminService.getAll();
    return { data };
  }

  @ApiDocs({
    operation: 'Get product',
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @UserProtected()
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('Product retrieved successfully.')
  @Get(':id')
  async getById(@Param('id') id: number): Promise<IResponse<ProductEntity>> {
    const data = await this.productAdminService.getById(id, {
      options: {
        select: {
          id: true,
          name: true,
        },
      },
    });
    if (!data) throw new NotFoundException('Cannot find product');
    return { data };
  }

  @ApiDocs({
    operation: 'Update product',
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @UserProtected()
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('Product updated successfully.')
  @Patch(':id')
  async updateById(
    @Param('id') id: number,
    @Body() updateProductData: UpdateProductDto,
  ): Promise<IResponse<ProductEntity>> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const existingProduct: ProductEntity | null =
        await this.productAdminService.getById(id);
      if (!existingProduct) throw new NotFoundException('Cannot find product');
      await this.productAdminService.update(
        existingProduct,
        updateProductData,
        {
          entityManager: queryRunner.manager,
        },
      );
      await queryRunner.commitTransaction();
      return await this.getById(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @ApiDocs({
    operation: 'Delete product',
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @UserProtected()
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('Product deleted  successfully.')
  @Delete(':id')
  async deleteByID(@Param('id') id: number): Promise<IResponse<ProductEntity>> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const existingProduct: ProductEntity | null =
        await this.productAdminService.getById(id);
      if (!existingProduct) throw new NotFoundException('Cannot find product');
      const data = await this.productAdminService.delete(existingProduct, {
        entityManager: queryRunner.manager,
      });
      await queryRunner.commitTransaction();
      return { data };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
