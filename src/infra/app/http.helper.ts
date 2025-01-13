import { HttpException, HttpStatus } from '@nestjs/common';

const HTTP_EXCEPTIONS_MAPPING = {
  'notfound-error': new HttpException('Not Found', HttpStatus.NOT_FOUND),
  'exists-error': new HttpException('Already Exists', HttpStatus.CONFLICT),
  'unexpected-error': new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR),
};

export const throwHttpException = (error: Error & { type: keyof typeof HTTP_EXCEPTIONS_MAPPING }) => {
  console.log(error);
  throw HTTP_EXCEPTIONS_MAPPING[error.type];
};

export const DURATION = {
  ONE_HOUR: 60 * 60,
};

export const setHttpCacheHeader = (duration: number) => {
  return ['cache-control' as const, `max-age=${duration}` as const] as const;
};
