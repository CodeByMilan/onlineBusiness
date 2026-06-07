import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interfaces';
import { IsEmail, IsString } from 'class-validator';

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
}
