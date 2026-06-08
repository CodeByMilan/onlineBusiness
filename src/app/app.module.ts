import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common/common.module';
import { AppController } from './app.controller';
import { RouterModule } from 'src/router/router.module';

@Module({
  imports: [CommonModule, RouterModule],
  controllers: [AppController],
})
export class AppModule {}
