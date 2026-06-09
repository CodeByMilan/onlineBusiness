import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserProtected } from 'src/common/auth/decorators/auth.decorators';
import { ApiDocs } from 'src/common/doc/common-docs';
import { isFalsy } from 'src/common/request/validators/custom-validator';
import { ResponseMessage } from 'src/common/response/decorators/responseMessage.decorators';
import { DataSource, FindOptionsWhere, QueryRunner } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserFilterDto } from '../dto/filter-user.dto';
import { UserEntity } from '../repositoy/entities/user.entity';
import { UserService } from '../services/user.service';
import { USER_TYPE } from '../interfaces/user.interfaces';

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
        { type: USER_TYPE.ADMIN, ...body },
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

  @ApiDocs({
    operation: 'list all user ',
  })
  @UserProtected()
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
