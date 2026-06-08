import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsEnum, ValidationOptions } from 'class-validator';


/**
 * Checks if a given value is of the provided enum 
 * before checking simply transforms the value to uppercase and returns custom message 
 */
export const CustomIsEnum = (
  entity: object,
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  return applyDecorators(
    Transform(({ value }) => value?.toUpperCase?.() ?? value),
    IsEnum(entity, {
      message: `Value must be one of: ${Object.values(entity).join(', ')}`,
      ...validationOptions,
    }),
  );
};


/**
 * check weather value is null or undefined
 * @param value any
 * @returns boolean
 */
export const isFalsy = (value: any): boolean => {
    if (value === null || value === undefined) {
      return true;
    }
    return false;
  };