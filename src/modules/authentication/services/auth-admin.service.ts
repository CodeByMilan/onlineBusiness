import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/admin.login.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthenticationAdminService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto) {}

  async getUserForRequest(id: number): Promise<UserEntity | null> {
    return await this.userService.getById(id);
  }
}
