import { HttpStatus } from '@nestjs/common';

import { AppException } from './app-exception';
import { ErrorTypes } from './error.types';

export class ForbiddenOperationException extends AppException {
  constructor(detail = 'Operation is not allowed', meta?: Record<string, unknown>) {
    super({
      type: ErrorTypes.USER_BLOCKED,
      title: 'Forbidden operation',
      detail,
      status: HttpStatus.FORBIDDEN,
      meta,
    });
  }
}
