import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const UseJwtResetPasswordGuard = () => UseGuards(JwtResetPasswordGuard);
@Injectable()
export class JwtResetPasswordGuard extends AuthGuard('jwt-reset-password') {}
