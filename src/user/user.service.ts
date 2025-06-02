import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundException } from './exeptions/user-not-found.exeption';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserPasswordInvalid } from './exeptions/user-password-invalid';
import { UserResponseDto } from './dto/user-response.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.databaseService.users.create(createUserDto);
    return new UserResponseDto(newUser);
  }

  findAll() {
    return this.databaseService.users
      .findMany()
      .map((user) => new UserResponseDto(user));
  }

  findOne(id: string) {
    const user = this.databaseService.users.findUnique(id);
    if (!user) throw new UserNotFoundException();
    return new UserResponseDto(user);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.databaseService.users.findUnique(id);
    if (!user) throw new UserNotFoundException();
    if (user.password !== updatePasswordDto.oldPassword)
      throw new UserPasswordInvalid();
    const updatedUser = this.databaseService.users.update(
      id,
      updatePasswordDto,
    );
    return new UserResponseDto(updatedUser);
  }

  remove(id: string) {
    const user = this.databaseService.users.findUnique(id);
    if (!user) throw new UserNotFoundException();
    return this.databaseService.users.delete(id);
  }
}
