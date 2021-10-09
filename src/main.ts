import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupFtilers } from './filters/setup-filter';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  setupSwagger(app);

  setupFtilers(app);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const transformedMessage = errors
          .map((err) => Object.values(err.constraints || {})?.join('\n'))
          .join('\n');
        throw new BadRequestException(transformedMessage);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
