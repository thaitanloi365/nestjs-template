import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginResponseDto, TokenDio } from './dtos/login.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getAuthenticatedUser(email: string, hashPassword: string) {
    const user = await this.usersService.findByEmail(email);

    await this.verifyPassword(user.password, hashPassword);

    const token = await this.createToken(user);

    return new LoginResponseDto(user, token);
  }

  async verifyPassword(password: string, hashPassword: string) {
    const isMatch = await bcrypt.compare(hashPassword, password);
    if (!isMatch) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  async createToken(user: User) {
    const expiresIn = this.configService.get('JWT_EXPIRY');
    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn },
    );

    return new TokenDio(expiresIn, accessToken);
  }
}
