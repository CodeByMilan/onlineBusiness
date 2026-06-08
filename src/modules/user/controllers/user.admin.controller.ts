import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { DataSource, FindOptionsWhere, QueryRunner } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ResponseMessage } from 'src/common/response/decorators/responseMessage.decorators';
import { UserFilterDto } from '../dto/filter-user.dto';
import { isFalsy } from 'src/common/request/validators/custom-validator';
import { AuthJwtAccessGuard } from 'src/common/auth/guards/jwt-access/auth.jwt-access.guard';

@ApiTags('User')
@Controller('user')
export class UserAdminController {
  constructor(
    private readonly userService: UserService,
    private connection: DataSource,
  ) {}
  @ResponseMessage('Users Created successfully')
  @Post('')
  async register(@Body() body: CreateUserDto): Promise<UserEntity> {
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
      return data;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(AuthJwtAccessGuard)
  @ResponseMessage('Users fetched  successfully.')
  @Get('')
  async list(@Query() userFilterDto: UserFilterDto): Promise<UserEntity[]> {
    const where: FindOptionsWhere<UserEntity> = {};

    if (!isFalsy(userFilterDto?.type)) {
      where.type = userFilterDto?.type;
    }

    const data = await this.userService.getAll();
    return data;
  }
}
