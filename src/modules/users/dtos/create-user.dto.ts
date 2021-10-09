import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ default: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '1234' })
  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
