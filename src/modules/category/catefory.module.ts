import { Module } from '@nestjs/common';
import { CategoryRepositoryModule } from './repository/repositories/category.repository.module';
import { CategoryAdminService } from './services/category.admin.service';

@Module({
  imports: [CategoryRepositoryModule],
  providers: [CategoryAdminService],
  exports: [CategoryAdminService],
})
export class CategoryModule {}
