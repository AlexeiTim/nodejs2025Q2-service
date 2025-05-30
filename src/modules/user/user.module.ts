import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUserStore } from './store/user.store';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      useClass: InMemoryUserStore,
      provide: 'UserStore',
    },
  ],
})
export class UserModule {}
