import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { User } from '../modules/users/entities/user.entity';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    return request.user;
  },
);
