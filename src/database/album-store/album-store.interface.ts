import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';

export interface AlbumStore {
  findMany: () => Promise<Album[]>;
  findUnique: (id: string) => Promise<Album>;
  create: (dto: CreateAlbumDto) => Promise<Album>;
  update: (id: string, dto: UpdateAlbumDto) => Promise<Album>;
  delete: (id: string) => Promise<void>;
}
