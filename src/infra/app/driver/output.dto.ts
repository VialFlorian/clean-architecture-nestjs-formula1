import { Type } from '@sinclair/typebox';

export const DriverResponseSchema = Type.Object({
  code: Type.String(),
  firstName: Type.String(),
  lastName: Type.String(),
  dateOfBirth: Type.String(),
  nationality: Type.String(),
});
