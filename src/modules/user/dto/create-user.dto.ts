import { ApiProperty } from '@nestjs/swagger';
import { IUser, USER_TYPE } from '../interfaces/user.interfaces';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto implements IUser {
  @ApiProperty({
    required: true,
    example: 'lish@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: 'Test@123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    required: false,
    enum: USER_TYPE,
  })
  @IsEnum(USER_TYPE)
  type: USER_TYPE;
}
