import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ApiDocs } from 'src/common/doc/common-docs';
import { DataSource, QueryRunner } from 'typeorm';
import { AuthenticationAdminService } from '../services/authentication.admin.service';
import { LoginDto } from '../dto/admin.login.dto';
import { AuthToken } from '../serializations/auth.serialization';
import { ResponseMessage } from 'src/common/response/decorators/responseMessage.decorators';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationAdminController {
  constructor(
    private readonly authenticationAdminService: AuthenticationAdminService,
    private connection: DataSource,
  ) {}

  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiDocs({
    operation: 'Login',
    jwtAccessToken: false,
  })
  @ResponseMessage('Login successful')
  @Post('login')
  async login(@Body() body: LoginDto): Promise<AuthToken> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const data: AuthToken = await this.authenticationAdminService.login(
        body,
        queryRunner.manager,
      );
      await queryRunner.commitTransaction();
      return data;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
