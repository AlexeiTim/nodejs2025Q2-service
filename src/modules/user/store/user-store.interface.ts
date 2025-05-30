import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface UserStore {
  create: (dto: CreateUserDto) => User;
  findMany: () => User[];
  findUnique: (id: string) => User;
  delete: (id: string) => void;
}
