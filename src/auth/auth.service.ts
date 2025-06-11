import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { UserPasswordInvalid } from 'src/user/exeptions/user-password-invalid';
import { SignupDto } from './dto/signup.dto';
import { UserAlreadyExists } from 'src/user/exeptions/user-already-exists.exeption';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByLogin(loginDto.login);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UserPasswordInvalid();
    }

    const payload = {
      userId: user.id,
      login: user.login,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshTokenDto: { refreshToken: string }) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_KEY,
        },
      );

      if (!decodedToken) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.findOne(decodedToken.userId);
      if (!user) {
        throw new UnauthorizedException();
      }

      const payload = {
        userId: user.id,
        login: user.login,
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async signup(signupDto: SignupDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        login: signupDto.login,
      },
      omit: {
        password: true,
      },
    });
    if (user) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const newUser = await this.userService.create({
      login: signupDto.login,
      password: hashedPassword,
    });

    return newUser;
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      if (!decodedToken) {
        return false;
      }

      const user = await this.userService.findOne(decodedToken.userId);
      if (!user) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
