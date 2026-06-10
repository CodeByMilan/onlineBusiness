import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { UserEntity } from '../entities/user.entity';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
  controllers: [],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserRepositoryModule {}
