import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: true,
    example: 'lish@gmail.com',
  })
  @IsEmail()
  email: string;
}
