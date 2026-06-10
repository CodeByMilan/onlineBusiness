import { Module } from '@nestjs/common';
import { AuthJwtAccessStrategy } from './guards/jwt-access/auth.jwt-strategy';

@Module({
  providers: [AuthJwtAccessStrategy],
})
export class AuthModule {}
