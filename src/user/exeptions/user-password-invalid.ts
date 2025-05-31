import { ForbiddenException } from '@nestjs/common';

export class UserPasswordInvalid extends ForbiddenException {
  constructor() {
    super('Invalid password');
  }
}
