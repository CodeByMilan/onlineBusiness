import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoginDto } from '../dto/admin.login.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { AuthToken } from '../serializations/auth.serialization';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationAdminService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(
    loginDto: LoginDto,
    entityManager: EntityManager,
  ): Promise<AuthToken> {
    const where: FindOptionsWhere<UserEntity> = { email: loginDto.email };
    const user: UserEntity | null = await this.userService.getOne({
      options: {
        where,
        select: {
          id: true,
          password: true,
          deletedAt: true,
          type: true,
        },
      },
      entityManager,
    });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (user.deletedAt) {
      throw new BadRequestException('User deleted, please contact to admin.');
    }
    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatched) {
      throw new ForbiddenException(
        'Invalid Details Please enter correct email and password',
      );
    }

    const token = await this.getToken(user);

    return token;
  }

  async getToken(user: UserEntity): Promise<AuthToken> {
    const accessToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_EXPIRE_IN'),
      },
    );

    return {
      accessToken,
      expiresInSeconds: this.configService.get('JWT_EXPIRE_IN'),
    };
  }
  async getUserForRequest(id: number): Promise<UserEntity | null> {
    return await this.userService.getById(id);
  }
}
