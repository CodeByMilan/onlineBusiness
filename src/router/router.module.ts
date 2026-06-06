import { Module } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { AdminRouterModule } from './routes/admin.router.module';
import { UserRouterModule } from './routes/user.router.module';

@Module({
  imports: [
    AdminRouterModule,
    UserRouterModule,
    NestJsRouterModule.register([
      {
        path: 'admin',
        module: AdminRouterModule,
      },
      {
        path: 'user',
        module: UserRouterModule,
      },
    ]),
  ],
})
export class RouterModule {}
