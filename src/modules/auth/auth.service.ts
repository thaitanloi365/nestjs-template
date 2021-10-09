import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async getAuthenticatedUser(email: string, hashPassword: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      await this.verifyPassword(user.password, hashPassword);

      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  async verifyPassword(password: string, hashPassword: string) {
    const isMatch = await bcrypt.compare(hashPassword, password);
    if (!isMatch) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }
}
