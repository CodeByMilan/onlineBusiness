import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CategoryEntity } from '../entities/category.entity';

@Module({
  providers: [CategoryRepository],
  exports: [CategoryRepository],
  controllers: [],
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
})
export class CategoryRepositoryModule {}
