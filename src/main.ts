import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupFtilers } from './filters/setup-filter';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  setupSwagger(app);

  setupFtilers(app);

  await app.listen(3000);
}
bootstrap();
