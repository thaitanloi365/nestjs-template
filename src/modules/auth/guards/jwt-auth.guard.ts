import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const UseJwtAuthGuard = () => UseGuards(JwtAuthGuard);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser>(err: Error, user: TUser): TUser {
    const userModel: any = { ...user };

    if (err || !user || !userModel.id) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
