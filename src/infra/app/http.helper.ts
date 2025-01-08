import { HttpException, HttpStatus } from '@nestjs/common';

const HTTP_EXCEPTIONS_MAPPING = {
  'notfound-error': new HttpException('Not Found', HttpStatus.NOT_FOUND),
  'unexpected-error': new HttpException(
    'Internal Server Error',
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
};

export const throwHttpException = (
  error: Error & { type: keyof typeof HTTP_EXCEPTIONS_MAPPING },
) => {
  throw HTTP_EXCEPTIONS_MAPPING[error.type];
};
