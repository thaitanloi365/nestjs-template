import { INestApplication } from '@nestjs/common';
import { GlobalExceptionFilter } from './global.filter';

export function setupFtilers(app: INestApplication): void {
  app.useGlobalFilters(new GlobalExceptionFilter());
}
