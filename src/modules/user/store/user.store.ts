import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserStore } from './user-store.interface';
import { UpdatePasswordDto } from '../dto/update-password.dto';

const TEST_USER: User = {
  id: 'fc3142ad-a6c2-4688-b635-b846d8324f0a',
  createdAt: 1,
  login: '',
  password: '1',
  updatedAt: 1,
  version: 1,
};

const users: User[] = [TEST_USER];

export class InMemoryUserStore implements UserStore {
  findUnique(id: string): User {
    return users.find((user) => user.id === id);
  }

  findMany(): User[] {
    return users;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser = {
      createdAt: Date.now(),
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      updatedAt: Date.now(),
      version: 1,
    };
    users.push(newUser);
    return newUser;
  }

  delete(id: string) {
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1);
  }

  update(id: string, dto: UpdatePasswordDto): User {
    const userIndex = users.findIndex((user) => user.id === id);
    const oldUser = users[userIndex];
    const updatedUser: User = {
      ...oldUser,
      password: dto.newPassword,
      updatedAt: Date.now(),
      version: ++oldUser.version,
    };
    users[userIndex] = updatedUser;
    return updatedUser;
  }
}
