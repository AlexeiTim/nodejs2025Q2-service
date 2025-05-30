import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStore } from './store/user-store.interface';
import { UserNotFoundException } from './exeptions/user-not-found.exeption';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserPasswordInvalid } from './exeptions/user-password-invalid';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(@Inject('UserStore') private userStore: UserStore) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userStore.create(createUserDto);
    return new UserResponseDto(newUser);
  }

  findAll() {
    return this.userStore.findMany().map((user) => new UserResponseDto(user));
  }

  findOne(id: string) {
    const user = this.userStore.findUnique(id);
    if (!user) throw new UserNotFoundException();
    return new UserResponseDto(user);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.userStore.findUnique(id);
    if (!user) throw new UserNotFoundException();
    if (user.password !== updatePasswordDto.oldPassword)
      throw new UserPasswordInvalid();
    const updatedUser = this.userStore.update(id, updatePasswordDto);
    return new UserResponseDto(updatedUser);
  }

  remove(id: string) {
    const user = this.userStore.findUnique(id);
    if (!user) throw new UserNotFoundException();
    return this.userStore.delete(id);
  }
}
