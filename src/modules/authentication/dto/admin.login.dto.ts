import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    example: 'lish@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'please enter a valid email address' })
  email: string;

  @ApiProperty({
    required: true,
    example: 'Test@123',
  })
  //later we will make custom decorator that will check even space and throws error
  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString()
  password: string;
}
