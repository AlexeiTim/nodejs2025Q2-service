import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { AlbumStore } from './album-store.interface';
import { Album } from 'src/album/entities/album.entity';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { randomUUID } from 'crypto';

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

  findUnique(id: string) {
    const album = albums.find((album) => album.id === id);
    return album;
  }

  create(dto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: randomUUID(),
      ...dto,
      artistId: dto.artistId || null,
    };
    albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, dto: UpdateAlbumDto) {
    const albumIndex = albums.findIndex((album) => album.id === id);
    const updatedAlbum = {
      ...dto,
      id,
    };
    albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }

  delete(id: string) {
    const albumIndex = albums.findIndex((album) => album.id === id);
    albums.splice(albumIndex, 1);
  }
}
