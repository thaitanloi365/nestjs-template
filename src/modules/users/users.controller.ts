import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseJwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseJwtRolesGuard } from '../auth/guards/roles.guard';
import { PaginationParamDto } from '../../common/dtos/pagination-param.dto';
import { IDParam } from '../../common/dtos/id-param';
import { User } from './entities/user.entity';
import { CurrentUser } from '../../decorators/current-user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseJwtRolesGuard()
@UseJwtAuthGuard()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Param() param: PaginationParamDto) {
    return this.usersService.paginate({
      limit: param.limit,
      page: param.page,
    });
  }

  @Get(':id')
  findOne(@Param() param: IDParam) {
    return this.usersService.findOne(param.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
