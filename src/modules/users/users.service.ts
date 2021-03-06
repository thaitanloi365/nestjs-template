import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { generateUUID } from '../../common/utils/genrate-uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const dto = new User();
    dto.email = createUserDto.email;
    dto.password = createUserDto.password;
    dto.name = '';
    dto.jwtId = generateUUID();

    const user = await this.usersRepository.save(dto);

    return user;
  }

  async paginate(options: IPaginationOptions) {
    const queryBuilder = this.usersRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<User>(queryBuilder, options);
  }
  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ id });
    return user;
  }

  async logout(id: string) {
    await this.usersRepository.update({ id }, { jwtId: null });
  }

  update(id: string, updateUserDto: Partial<User>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updateResetPasswordToken(id: string, token: string) {
    return await this.usersRepository.update(
      { id },
      {
        resetPasswordToken: token,
      },
    );
  }

  async updateJwtId(id: string, jwtId: string) {
    return await this.usersRepository.update(
      { id },
      {
        jwtId,
      },
    );
  }

  async updatePassword(user: User, newPassword: string) {
    user.password = newPassword;
    await user.hashPassword();
    return await this.usersRepository.update(
      { id: user.id },
      {
        password: user.password,
        resetPasswordToken: null,
      },
    );
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
