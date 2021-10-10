import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { setupFitlers } from './filters/setup-filters';
import { setupInterceptors } from './interceptor/setup-interceptors';
import { setupPipes } from './pipes/setup-pipes';
import { setupSwagger } from './swagger';
import { setupViews } from './views/setup-views';

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  setupSwagger(app);

  setupFitlers(app);

  setupPipes(app);

  setupInterceptors(app);

  setupViews(app);

  const port = process.env.PORT;
  await app.listen(port, '0.0.0.0', () =>
    logger.log(`Application started at ::${port}`),
  );
}
bootstrap();
