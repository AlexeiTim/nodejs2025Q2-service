import { Artist } from 'src/modules/artist/entities/artist.entity';

export interface ArtistStore {
  findMany: () => Artist[];
}
