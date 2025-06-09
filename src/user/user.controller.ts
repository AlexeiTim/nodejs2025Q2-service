import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserParamDto } from './dto/user-param.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserPasswordInvalid } from './exeptions/user-password-invalid';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UserParamDto) {
    return this.userService.findOne(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: UserParamDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      return await this.userService.update(params.id, updatePasswordDto);
    } catch (error) {
      if (error instanceof UserPasswordInvalid) {
        throw new ForbiddenException();
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: UserParamDto) {
    return this.userService.remove(params.id);
  }
}
