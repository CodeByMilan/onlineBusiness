import { ApiPropertyOptional } from '@nestjs/swagger';
import { USER_TYPE } from '../interfaces/user.interfaces';
import { IsOptional } from 'class-validator';
import { CustomIsEnum } from 'src/common/request/validators/custom-validator';

export class UserFilterDto {
  @ApiPropertyOptional({ enum: USER_TYPE, required: false })
  @IsOptional()
  @CustomIsEnum(USER_TYPE)
  type?: USER_TYPE;
}
