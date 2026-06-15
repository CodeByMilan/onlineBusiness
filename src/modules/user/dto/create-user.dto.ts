import { ApiProperty } from '@nestjs/swagger';
import { IUser, USER_GENDER, USER_TYPE } from '../interfaces/user.interfaces';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CustomIsEnum } from 'src/common/request/validators/custom-validator';

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

  @ApiProperty({
    required: false,
    example: 'milan',
    maxLength: 100,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName?: string;

  @ApiProperty({
    required: false,
    example: 'Acharya',
    maxLength: 100,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName?: string;

  @ApiProperty({
    required: false,
    example: 'kathmandu',
    maxLength: 255,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  address?: string;
  @ApiProperty({
    required: false,
    example: '9812345678',
    maxLength: 10,
    type: String,
    minLength: 10,
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @IsNumberString({}, { message: 'Phone must be number' })
  phone?: string;

  @ApiProperty({
    required: false,
    example: 'milan_acharya',
    minLength: 5,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  username?: string;

  @ApiProperty({
    required: true,
    example: USER_GENDER.MALE,
    enum: USER_GENDER,
  })
  @CustomIsEnum(USER_GENDER)
  @IsNotEmpty()
  gender: USER_GENDER | undefined;
}
