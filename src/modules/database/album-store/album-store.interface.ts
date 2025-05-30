import { Album } from 'src/modules/album/entities/album.entity';

export interface AlbumStore {
  findMany: () => Album[];
}
