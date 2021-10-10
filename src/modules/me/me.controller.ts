import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MeService } from './me.service';
import { UpdateMeDto } from './dto/update-me.dto';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UseJwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Me')
@ApiBearerAuth()
@Controller('api/v1/me')
@UseJwtAuthGuard()
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  get(@CurrentUser() user) {
    return user;
  }

  @Put()
  update(@Param('id') id: string, @Body() data: UpdateMeDto) {
    return this.meService.update(id, data);
  }
}
