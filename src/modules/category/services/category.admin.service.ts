import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, DeepPartial, ILike, Not } from 'typeorm';
import { CategoryRepository } from '../repository/repositories/category.repository';
import { ICreateOptions } from 'src/common/database/base/interfaces/createOption.interface';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../repository/entities/category.entity';
import {
  IFindAllOptions,
  IFindOneOptions,
} from 'src/common/database/base/interfaces/findOption.interface';
import { IDeleteOptions } from 'src/common/database/base/interfaces/deleteOption.interface';
import { IUpdateOptions } from 'src/common/database/base/interfaces/updateOption.interface';

@Injectable()
export class CategoryAdminService {
  constructor(
    private readonly repository: CategoryRepository,
    private dataSource: DataSource,
  ) {}

  async create(
    createDto: CreateCategoryDto,
    options?: ICreateOptions,
  ): Promise<CategoryEntity> {
    const existingCategory = await this.getOne({
      options: {
        where: [
          { name: ILike(`${createDto.name}`) }, //For case-insensitive,
        ],
      },
    });
    if (existingCategory) {
      throw new BadRequestException(
        'Category already exists same name or position',
      );
    }
    const userId = options.user.id;
    createDto.userId = userId;
    const data = await this.repository._create(createDto, options);
    return data;
  }

  async getById(
    id: number,
    options?: IFindOneOptions<CategoryEntity>,
  ): Promise<CategoryEntity | null> {
    const data = await this.repository._findOneById(id, options);
    return data;
  }

  async getOne(
    options: IFindOneOptions<CategoryEntity>,
  ): Promise<CategoryEntity | null> {
    const data = await this.repository._findOne(options);
    return data;
  }

  async getOneOrFail(
    options: IFindOneOptions<CategoryEntity>,
  ): Promise<CategoryEntity> {
    const data = await this.getOne(options);
    if (!data) {
      throw new NotFoundException('Cannot find Category');
    }
    return data;
  }

  async getAll(
    options?: IFindAllOptions<CategoryEntity>,
  ): Promise<CategoryEntity[]> {
    return await this.repository._findAll(options);
  }

  async delete(
    repository: CategoryEntity,
    options?: IDeleteOptions<CategoryEntity>,
  ): Promise<CategoryEntity> {
    return await this.repository._delete(repository, options);
  }

  async update(
    repository: CategoryEntity,
    updateData: DeepPartial<CategoryEntity>,
    options?: IUpdateOptions<CategoryEntity>,
  ) {
    if (updateData.name) {
      const existingCategory = await this.getOne({
        options: {
          where: {
            name: ILike(`${updateData.name}`),
            id: Not(repository.id),
          },
        },
      });
      if (existingCategory) {
        throw new BadRequestException('Category with that same name exists');
      }
    }

    Object.assign(repository, updateData);

    return await this.repository._update(repository, options);
  }
}
