import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class TokenDio {
  @ApiProperty()
  expiresIn: string;

  @ApiProperty()
  accessToken: string;

  constructor(expiresIn: string, accessToken: string) {
    this.expiresIn = expiresIn;
    this.accessToken = accessToken;
  }
}

export class LoginResponseDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: TokenDio;

  constructor(user: User, token: TokenDio) {
    this.user = user;
    this.token = token;
  }
}
