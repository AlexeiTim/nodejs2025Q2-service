import { AlbumStore } from './album-store.interface';
import { Album } from 'src/modules/album/entities/album.entity';

const TEST_ALBUM: Album = {
  id: 'fc3142ad-a6c2-4688-b635-b846d8324f0a',
  name: 'test',
  artistId: null,
  year: 1,
};

const albums: Album[] = [TEST_ALBUM];

export class InMemoryAlbumsStore implements AlbumStore {
  findMany(): Album[] {
    return albums;
  }
}
