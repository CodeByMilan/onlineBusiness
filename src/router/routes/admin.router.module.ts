import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { AuthenticationAdminController } from 'src/modules/authentication/controllers/authentication.admin.controller';
import { CategoryModule } from 'src/modules/category/catefory.module';
import { CategoryAdminController } from 'src/modules/category/controllers/category.admin.controller';
import { ProductAdminController } from 'src/modules/product/controllers/product.admin.controller';
import { ProductModule } from 'src/modules/product/product.module';
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule, AuthenticationModule, CategoryModule, ProductModule],
  controllers: [
    UserAdminController,
    AuthenticationAdminController,
    CategoryAdminController,
    ProductAdminController,
  ],
})
export class AdminRouterModule {}
