import { INestApplication } from '@nestjs/common';
import { BaseExceptionFilter } from './base.exception.filter';

export function setupFitlers(app: INestApplication): void {
  app.useGlobalFilters(new BaseExceptionFilter());
}
