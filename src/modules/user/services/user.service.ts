import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../repository/entities/user.entity';
import {
  IFindAllOptions,
  IFindOneOptions,
} from 'src/common/database/base/interfaces/findOption.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUpdateOptions } from 'src/common/database/base/interfaces/updateOption.interface';
import { Not } from 'typeorm';
import { IDeleteOptions } from 'src/common/database/base/interfaces/deleteOption.interface';
import { ICreateOptions } from 'src/common/database/base/interfaces/createOption.interface';
import { UserRepository } from '../repository/repositories/user.repository';


@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async create(createDto: CreateUserDto, options?: ICreateOptions) {
    await this.checkUserExists(createDto);
    const data = await this.userRepo._create(createDto, {
      entityManager: options?.entityManager,
    });
    return data;
  }

  async getById(
    id: number,
    options?: IFindOneOptions<UserEntity>,
  ): Promise<UserEntity | null> {
    const data = await this.userRepo._findOneById(id, options);
    return data;
  }
  async getAll(options?: IFindAllOptions<UserEntity>): Promise<UserEntity[]> {
    return await this.userRepo._findAll(options);
  }
  async getOne(
    options: IFindOneOptions<UserEntity>,
  ): Promise<UserEntity | null> {
    const data = await this.userRepo._findOne(options);
    return data;
  }
  async update(
    repo: UserEntity,
    updateData: UpdateUserDto,
    options?: IUpdateOptions<UserEntity>,
  ) {
    if (updateData.email) {
      const check = await this.userRepo._findOne({
        options: {
          where: {
            id: Not(repo.id),
            email: updateData?.email,
          },
        },
      });
      if (check) {
        throw new BadRequestException(' Email is already Used');
      }
    }

    Object.assign(repo, updateData);
    return await this.userRepo._update(repo, options);
  }

  async delete(
    repo: UserEntity,
    options?: IDeleteOptions<UserEntity>,
  ): Promise<UserEntity> {
    return await this.userRepo._delete(repo, options);
  }

  /*
  get userDetails 
 */
  async getUserDetail(repo: UserEntity) {
    const data = await this.getById(repo.id, {
      options: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          address: true,
        },
      },
    });
    if (!data) throw new NotFoundException('Cannot find user');
    return data;
  }
  /* 
  check if the user with the provided email address exits or not
  */
  async checkUserExists(user: Partial<UserEntity>) {
    const foundUser = await this.getOne({
      options: {
        where: {
          email: user.email,
        },
      },
    });
    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }
  }
}
