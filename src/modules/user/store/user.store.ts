import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

const users: User[] = [];

interface InMemoryUserStore {
  create: (dto: CreateUserDto) => User;
  findMany: () => User[];
}

export class UserStore implements InMemoryUserStore {
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
