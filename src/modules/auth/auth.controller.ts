import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authService.getAuthenticatedUser(body.email, body.password);
  }

  @Post('/register')
  async register(@Body() body: LoginDto) {
    const dto = new CreateUserDto(body.email, body.password);
    const user = await this.usersService.create(dto);
    const token = await this.authService.createToken(user);

    return new LoginResponseDto(user, token);
  }

  @Post('/forgot_password')
  async forgotPassword(@Body() body: LoginDto) {
    const dto = new CreateUserDto(body.email, body.password);
    const user = await this.usersService.create(dto);
    const token = await this.authService.createToken(user);

    return new LoginResponseDto(user, token);
  }
}
