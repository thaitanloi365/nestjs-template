import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { LoginDto, LoginResponseDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { UseJwtResetPasswordGuard } from './guards/jwt-reset-password.guard';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authService.validateUser(body.email, body.password);
  }

  @Post('/register')
  async register(@Body() body: LoginDto) {
    const dto = new CreateUserDto(body.email, body.password);
    const user = await this.usersService.create(dto);
    const token = await this.authService.createToken(user);

    return new LoginResponseDto(user, token);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(body.email);
    const token = await this.authService.createTokenResetPassword(user);

    const resetPasswordLink = `${process.env.SERVER_BASE_URL}/api/v1/auth/reset-password?token=${token}`;
    console.log('resetPasswordLink', resetPasswordLink);
    return {
      message: 'A reset password instruction is sent to your email',
    };
  }

  @Get('/reset-password')
  @Render('layouts/reset-password')
  @UseJwtResetPasswordGuard()
  async resetPasswordView(@Query('token') token: string) {
    const url = `${process.env.SERVER_BASE_URL}/api/v1/auth/reset-password?token=${token}`;
    return {
      reset_password_url: url,
    };
  }

  @Post('/reset-password')
  @UseJwtResetPasswordGuard()
  async resetPassword(
    @CurrentUser() user: User,
    @Body() data: ResetPasswordDto,
  ) {
    await this.usersService.updatePassword(user, data.password);

    return {
      message: 'Your password has been updated',
    };
  }
}
