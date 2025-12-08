import { Public } from '@klastack-nx/api/auth';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Public()
  @Get('health')
  health(): { status: 'ok' } {
    return { status: 'ok' };
  }
}
