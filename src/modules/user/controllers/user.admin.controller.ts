import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

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
  /* 
  used to list all the users as well as filter user on the basis of their type   
  */

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

  @ApiDocs({
    operation: 'Get user details by id ',
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @UserProtected()
  @ResponseMessage('User fetched Successfully !!!!')
  @RequestParamGuard(IdParamDto)
  @Get('/:id')
  async get(@Param() id: number): Promise<UserEntity> {
    const data = await this.userService.getById(id);
    return data;
  }
  /* 
update user details by id 
except password every other fields can be updated for now 
*/

  @UserProtected()
  @ApiDocs({
    operation: 'Update user',
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('User updated successfully.')
  @Patch('/:id')
  async updateById(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<IResponse<UserEntity>> {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const found: UserEntity | null = await this.userService.getById(id);
      if (!found) throw new NotFoundException('Cannot find user');
      const data = await this.userService.update(found, body, {
        entityManager: queryRunner.manager,
      });
      await queryRunner.commitTransaction();
      return { data };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /* 
delete user
*/
  @ApiDocs({
    operation: 'Soft delete user',
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('User  deleted successfully.')
  @Delete('/:id')
  async softDeleteById(
    @Param('id') id: number,
  ): Promise<IResponse<UserEntity>> {
    const found: UserEntity | null = await this.userService.getById(id);
    if (!found) throw new NotFoundException('Cannot find user');

    if (found.type === USER_TYPE.ADMIN) {
      throw new NotFoundException('Cannot Delete User');
    }
    const data = await this.userService.delete(found);
    return { data };
  }
}
