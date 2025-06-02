import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';

export interface ArtistStore {
  findMany: () => Artist[];
  findUnique: (id: string) => Artist;
  create: (dto: CreateArtistDto) => Artist;
  update: (id: string, dto: UpdateArtistDto) => Artist;
  delete: (id: string) => void;
}
