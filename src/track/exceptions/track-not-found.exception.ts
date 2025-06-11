import { NotFoundException } from '@nestjs/common';

export class TrackNotFoundException extends NotFoundException {
  constructor() {
    super('Track not found');
  }
}
