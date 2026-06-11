import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductAdminService } from '../services/product.admin.service';
import { ApiDocs } from 'src/common/doc/common-docs';
import { ResponseMessage } from 'src/common/response/decorators/responseMessage.decorators';
import { CreateProductDto } from '../dto/create-product.dto';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { ProductEntity } from '../repository/entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Product')
@Controller('product')
export class ProductAdminController {
  constructor(private readonly productAdminService: ProductAdminService) {}

  @ApiDocs({
    operation: 'Create new Product',
  })
  @ResponseMessage('Product created successfully.')
  @Post()
  async create(
    @Body() body: CreateProductDto,
  ): Promise<IResponse<ProductEntity>> {
    try {
      const data: ProductEntity = await this.productAdminService.create(body);
      return { data };
    } catch (error) {
      throw error;
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
}
