import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepository } from '../../../common/database/base/repositories/base.repository';
import {
  IUpdateOptions,
  IUpdateRawOptions,
} from 'src/common/database/base/interfaces/updateOption.interface';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    private dataSource: DataSource,
  ) {
    super(usersRepository);
  }
  getRepo(): Repository<UserEntity> {
    return this.usersRepository;
  }

  async _update(
    repo: UserEntity,
    options?: IUpdateOptions<UserEntity> | undefined,
  ): Promise<UserEntity> {
    return await super._update(repo, options);
  }

  async _save(
    repo: UserEntity,
    options?: IUpdateOptions<UserEntity> | undefined,
  ): Promise<UserEntity> {
    return await super._save(repo, options);
  }

  async _updateRaw(
    updateDto: QueryDeepPartialEntity<UserEntity>,
    options: IUpdateRawOptions<UserEntity>,
  ): Promise<UpdateResult> {
    return await super._updateRaw(updateDto, options);
  }
}
