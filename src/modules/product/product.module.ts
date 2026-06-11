import { Module } from '@nestjs/common';
import { ProductRepositoryModule } from './repository/repositories/product.repository';
import { ProductService } from './services/product.admin.service';

@Module({
  imports: [ProductRepositoryModule],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
