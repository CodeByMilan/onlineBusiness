import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ICreateOptions } from 'src/common/database/base/interfaces/createOption.interface';
import { ProductEntity } from '../repository/entities/product.entity';
import { ILike } from 'typeorm';
import { ProductRepository } from '../repository/repositories/product.repository.module';
import {
  IFindAllOptions,
  IFindOneOptions,
} from 'src/common/database/base/interfaces/findOption.interface';

@Injectable()
export class ProductAdminService {
  constructor(protected readonly productRepo: ProductRepository) {}

  async create(
    createDto: CreateProductDto,
    options?: ICreateOptions,
  ): Promise<ProductEntity> {
    const existingProduct = await this.getOne({
      options: {
        where: {
          name: ILike(`${createDto.name}`), //For case-insensitive
        },
      },
    });

    if (existingProduct) {
      throw new BadRequestException(
        'Product with the same name  already exists',
      );
    }

    const data = await this.productRepo._create(createDto, options);
    return data;
  }

  async getById(
    id: number,
    options?: IFindOneOptions<ProductEntity>,
  ): Promise<ProductEntity | null> {
    const data = await this.productRepo._findOneById(id, options);
    return data;
  }

  async getOne(
    options: IFindOneOptions<ProductEntity>,
  ): Promise<ProductEntity | null> {
    const data = await this.productRepo._findOne(options);
    return data;
  }

  async getAll(
    options?: IFindAllOptions<ProductEntity>,
  ): Promise<ProductEntity[]> {
    return await this.productRepo._findAll(options);
  }
}
