import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundException } from './exeptions/user-not-found.exeption';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserPasswordInvalid } from './exeptions/user-password-invalid';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prismaService.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
      },
      omit: {
        password: true,
      },
    });
    return new UserResponseDto(newUser);
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => new UserResponseDto(user));
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new UserNotFoundException();
    return new UserResponseDto(user);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new UserNotFoundException();

    const currentUser = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });

    if (currentUser.password !== updatePasswordDto.oldPassword)
      throw new UserPasswordInvalid();

    const updatedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
      },
    });
    return new UserResponseDto(updatedUser);
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new UserNotFoundException();
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async findByLogin(login: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        login,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
