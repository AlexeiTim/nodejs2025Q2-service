import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStore } from './store/user-store.interface';
import { UserNotFoundException } from './exeptions/user-not-found.exeption';

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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    const user = this.userStore.findUnique(id);
    if (!user) throw new UserNotFoundException();
    return this.userStore.delete(id);
  }
}
