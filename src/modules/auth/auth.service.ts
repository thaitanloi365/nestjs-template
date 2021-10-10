import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginResponseDto } from './dtos/login.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { generateUUID } from '../../common/utils/genrate-uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, hashPassword: string) {
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
    if (!user.jwtId || user.jwtId == '') {
      user.jwtId = generateUUID();
      await this.usersService.updateJwtId(user.id, user.jwtId);
    }

    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      { jwtid: user.jwtId },
    );

    return accessToken;
  }

  async createTokenResetPassword(user: User) {
    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      {
        jwtid: generateUUID(),
        secret: this.configService.get('JWT_SECRET_RESET_PASSWORD'),
      },
    );

    await this.usersService.updateResetPasswordToken(user.id, accessToken);
    return accessToken;
  }
}
