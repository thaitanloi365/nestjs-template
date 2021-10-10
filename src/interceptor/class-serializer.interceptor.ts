import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassContructor {
  new (...args: any[]);
}
export const UseClassSerializerInterceptor = (dto: ClassContructor) =>
  UseInterceptors(new ClassSerializerInterceptor(dto));

@Injectable()
export class ClassSerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return plainToClass(this.dto, data, {});
      }),
    );
  }
}
