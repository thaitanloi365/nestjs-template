import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
export class LoginDto {
  @ApiProperty({ default: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '1234' })
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

export class LoginResponseDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }
}
