import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStore } from './store/user-store.interface';
import { UserNotFoundException } from './exeptions/user-not-found.exeption';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserPasswordInvalid } from './exeptions/user-password-invalid';

@Injectable()
export class UserService {
  constructor(@Inject('UserStore') private userStore: UserStore) {}

  create(createUserDto: CreateUserDto) {
    return this.userStore.create(createUserDto);
  }

  findAll() {
    return this.userStore.findMany();
  }

  findOne(id: string) {
    const user = this.userStore.findUnique(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.userStore.findUnique(id);
    if (!user) throw new UserNotFoundException();
    if (user.password !== updatePasswordDto.oldPassword)
      throw new UserPasswordInvalid();

    return this.userStore.update(id, updatePasswordDto);
  }

  remove(id: string) {
    const user = this.userStore.findUnique(id);
    if (!user) throw new UserNotFoundException();
    return this.userStore.delete(id);
  }
}
