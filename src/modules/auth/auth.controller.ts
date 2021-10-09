import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

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
    const dto = new CreateUserDto();
    dto.email = body.email;
    dto.password = body.password;
    const user = this.usersService.create(dto);
  }
}
