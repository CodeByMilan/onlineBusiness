import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepositoryModule } from './repositoy/repositories/user.repository.module';

@Module({
  imports: [UserRepositoryModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
