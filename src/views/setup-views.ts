import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';

export function setupViews(app: NestFastifyApplication): void {
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'views'),
    layout: 'layouts/main',
  });
}
