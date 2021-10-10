import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpServer,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
} from 'typeorm';
import { BaseResponseError } from './base.exception.response.error';
import { isObject } from 'lodash';
@Catch()
export class BaseExceptionFilter<T = any> implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();
    let message = (exception as any).message.message;
    let code = 'HttpException';

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case HttpException:
        code = (exception as HttpException).name;
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        break;
      case UnauthorizedException:
        code = (exception as BadRequestException).name;
        status = (exception as UnauthorizedException).getStatus();
        message = (exception as UnauthorizedException).message;
        break;
      case BadRequestException:
        code = (exception as BadRequestException).name;
        status = (exception as BadRequestException).getStatus();
        message = (exception as BadRequestException).message;
        break;
      case UnauthorizedException:
        code = (exception as UnauthorizedException).name;
        status = (exception as UnauthorizedException).getStatus();
        message = (exception as UnauthorizedException).message;
        break;
      case ForbiddenException:
        code = (exception as ForbiddenException).name;
        status = (exception as ForbiddenException).getStatus();
        message = (exception as ForbiddenException).message;
        break;
      case QueryFailedError: // this is a TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        break;
      case CannotCreateEntityIdMapError: // and another
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return response
      .status(status)
      .send(BaseResponseError(status, message, code, request));
  }
}
