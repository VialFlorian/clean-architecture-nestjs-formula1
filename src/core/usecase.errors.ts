export abstract class UseCaseError extends Error {
  abstract readonly type: string;
}

export class UnexpectedError extends UseCaseError {
  readonly type = 'unexpected-error';
}

export class NotFoundError extends UseCaseError {
  readonly type = 'notfound-error';
}

export class ExistsError extends UseCaseError {
  readonly type = 'exists-error';
}
