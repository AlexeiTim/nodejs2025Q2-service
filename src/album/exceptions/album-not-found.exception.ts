import { NotFoundException } from '@nestjs/common';

export class AlbumNotFoundException extends NotFoundException {
  constructor() {
    super('Album not found');
  }
}
