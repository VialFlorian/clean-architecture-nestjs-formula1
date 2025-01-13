import { type Static, Type } from '@sinclair/typebox';

export const AddDriverBodySchema = Type.Object(
  {
    code: Type.String(),
    firstName: Type.String(),
    lastName: Type.String(),
    dateOfBirth: Type.String(),
    nationality: Type.String(),
  },
  { additionalProperties: false },
);

export type AddDriverBodyDto = Static<typeof AddDriverBodySchema>;
