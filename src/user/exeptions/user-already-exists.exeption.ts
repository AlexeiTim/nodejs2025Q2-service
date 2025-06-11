import { ConflictException } from '@nestjs/common';

export class UserAlreadyExists extends ConflictException {
  constructor() {
    super('User with this login already exists');
  }
}
