import { SetMetadata, applyDecorators } from '@nestjs/common';

//MethodDecorator indicates that this custom ResponseMessage Decorator can only be used in methods only 
export function ResponseMessage(message: string): MethodDecorator {
  return applyDecorators(SetMetadata('responseMessage', message));
}
