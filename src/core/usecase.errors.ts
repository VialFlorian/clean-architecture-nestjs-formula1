export class UnexpectedError extends Error {
  readonly type = 'unexpected-error';
}

export class NotFoundError extends Error {
  readonly type = 'notfound-error';
}
