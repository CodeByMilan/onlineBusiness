import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/base/repositories/base.repository';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {
    super(repository);
  }

  getRepo(): Repository<ProductEntity> {
    return this.repository;
  }
}
