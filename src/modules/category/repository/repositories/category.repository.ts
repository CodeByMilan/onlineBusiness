import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common/database/base/repositories/base.repository';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends BaseRepository<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {
    super(repository);
  }

  getRepo(): Repository<CategoryEntity> {
    return this.repository;
  }
}
