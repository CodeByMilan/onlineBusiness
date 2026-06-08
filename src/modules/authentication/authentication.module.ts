import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserRepositoryModule } from '../user/repositories/user.repository.module';
import { UserModule } from '../user/user.module';
import { AuthenticationAdminService } from './services/authentication.admin.service';

@Module({
  imports: [UserModule, JwtModule, UserRepositoryModule],
  providers: [AuthenticationAdminService],
  exports: [AuthenticationAdminService, UserModule],
})
export class AuthenticationModule {}
