import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

export function setupPipes(app: INestApplication): void {
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
}
