import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository.module';
import { ProductEntity } from '../entities/product.entity';

@Module({
  providers: [ProductRepository],
  exports: [ProductRepository],
  controllers: [],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductRepositoryModule {}
