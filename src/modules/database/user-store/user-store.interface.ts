import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/modules/user/dto/update-password.dto';
import { User } from 'src/modules/user/entities/user.entity';

export interface UserStore {
  create: (dto: CreateUserDto) => User;
  findMany: () => User[];
  findUnique: (id: string) => User;
  delete: (id: string) => void;
  update: (id: string, dto: UpdatePasswordDto) => User;
}
