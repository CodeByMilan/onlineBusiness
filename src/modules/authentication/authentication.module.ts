import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthenticationAdminService } from './services/authentication.admin.service';

@Module({
  imports: [UserModule, JwtModule],
  providers: [AuthenticationAdminService],
  exports: [AuthenticationAdminService],
})
export class AuthenticationModule {}
