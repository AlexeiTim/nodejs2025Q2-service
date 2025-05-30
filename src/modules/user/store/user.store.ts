import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

const TEST_USER: User = {
  id: randomUUID(),
  createdAt: 1,
  login: '',
  password: '',
  updatedAt: 1,
  version: 1,
};

const users: User[] = [TEST_USER];

export class InMemoryUserStore {
  findUnique(id: string): User {
    return users.find((user) => user.id === id);
  }

  findMany(): User[] {
    return users;
  }

  create(createUserDto: CreateUserDto): User {
    return {
      createdAt: 1,
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      updatedAt: 1,
      version: 1,
    };
  }
}
