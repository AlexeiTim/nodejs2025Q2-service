import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';

export interface ArtistStore {
  findMany: () => Promise<Artist[]>;
  findUnique: (id: string) => Promise<Artist>;
  create: (dto: CreateArtistDto) => Promise<Artist>;
  update: (id: string, dto: UpdateArtistDto) => Promise<Artist>;
  delete: (id: string) => Promise<void>;
}
