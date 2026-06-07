import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from 'src/common/common.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [CommonModule, RouterModule],
  controllers: [AppController],
})
export class AppModule {}
