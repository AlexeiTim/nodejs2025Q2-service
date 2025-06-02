import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';

export interface AlbumStore {
  findMany: () => Album[];
  findUnique: (id: string) => Album;
  create: (dto: CreateAlbumDto) => Album;
  update: (id: string, dto: UpdateAlbumDto) => Album;
  delete: (id: string) => void;
}
