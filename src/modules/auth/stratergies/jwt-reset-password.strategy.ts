import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtResetPasswordStatergy extends PassportStrategy(
  Strategy,
  'jwt-reset-password',
) {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_RESET_PASSWORD,
    });
  }

  async validate(payload: { id: string; jti: string; iat: number }) {
    const { id, jti } = payload;
    const user = await this.usersService.findOne(id);

    if (!user.resetPasswordToken) {
      throw new ForbiddenException('Invalid reset password token');
    }

    console.log('**** payload', payload);
    console.log('****', user.resetPasswordToken);
    const decodedPayload: any = this.jwtService.decode(user.resetPasswordToken);
    if (decodedPayload.iat !== payload.iat) {
      throw new ForbiddenException();
    }

    return user;
  }
}
