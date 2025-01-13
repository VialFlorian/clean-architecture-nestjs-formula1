import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createAddDriverSchema = z
  .object({
    code: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string(),
    nationality: z.string(),
  })
  .required()
  .strict();

export class AddDriverDto extends createZodDto(createAddDriverSchema) {}
