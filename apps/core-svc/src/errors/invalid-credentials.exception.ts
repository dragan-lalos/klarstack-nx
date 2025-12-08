import { HttpStatus } from '@nestjs/common';

import { AppException } from './app-exception';
import { ErrorTypes } from './error.types';

export class InvalidCredentialsException extends AppException {
  constructor(detail = 'Invalid credentials', meta?: Record<string, unknown>) {
    super({
      type: ErrorTypes.AUTH_INVALID_CREDENTIALS,
      title: 'Invalid credentials',
      detail,
      status: HttpStatus.UNAUTHORIZED,
      meta,
    });
  }
}
