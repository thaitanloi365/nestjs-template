import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Nest JS API')
    .setDescription('Nest JS API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Docs',
  };

  SwaggerModule.setup('api/docs', app, document, customOptions);
}
