import { Module } from '@nestjs/common';
import { ProductRepositoryModule } from './repository/repositories/product.repository';
import { ProductAdminService } from './services/product.admin.service';

@Module({
  imports: [ProductRepositoryModule],
  providers: [ProductAdminService],
  exports: [ProductAdminService],
})
export class ProductModule {}
