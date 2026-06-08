import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { DataSource, QueryRunner } from 'typeorm';

@ApiTags('User')
@Controller('user')
export class UserAdminController {
  constructor(
    private readonly userService: UserService,
    private connection: DataSource,
  ) {}

  @Post('')
  async register(@Body() body: CreateUserDto) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const data = await this.userService.create(
        {
          ...body,
        },
        {
          entityManager: queryRunner.manager,
        },
      );
      await queryRunner.commitTransaction();
      return { data };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
