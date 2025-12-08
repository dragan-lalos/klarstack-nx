import { HttpStatus } from '@nestjs/common';

import { AppException } from './app-exception';
import { ErrorTypes } from './error.types';

export class IncidentNotFoundException extends AppException {
  constructor(detail = 'Incident not found', meta?: Record<string, unknown>) {
    super({
      type: ErrorTypes.INCIDENT_NOT_FOUND,
      title: 'Incident not found',
      detail,
      status: HttpStatus.NOT_FOUND,
      meta,
    });
  }
}
