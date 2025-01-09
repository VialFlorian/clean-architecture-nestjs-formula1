import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed', formatError(error));
    }
  }
}

const formatError = (error: unknown) => {
  if (error instanceof ZodError) {
    const firstIssue = error.issues[0];
    const details = firstIssue.path.length > 0 ? ` (${firstIssue.path.join('.')})` : '';
    return `${firstIssue.message}${details}`;
  }

  return;
};
