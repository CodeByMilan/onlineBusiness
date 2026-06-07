import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interfaces';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: true,
    example: 'lish@gmail.com',
  })
  @IsEmail()
  email: string;
}
