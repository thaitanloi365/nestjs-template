import { IResponseError } from './base.exception.interface';
import { FastifyRequest } from 'fastify';

export const BaseResponseError: (
  statusCode: number,
  message: string,
  code: string,
  request: FastifyRequest,
) => IResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: FastifyRequest,
): IResponseError => {
  return {
    statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
  };
};
