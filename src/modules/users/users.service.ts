import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
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

    const user = await this.usersRepository.save(dto);

    return user;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ id });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
