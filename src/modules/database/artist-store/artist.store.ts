import { Artist } from 'src/modules/artist/entities/artist.entity';
import { ArtistStore } from './artist-store.interface';

const TEST_ARTIST: Artist = {
  id: 'fc3142ad-a6c2-4688-b635-b846d8324f0a',
  name: 'test',
  grammy: true,
};

const artists: Artist[] = [TEST_ARTIST];

export class InMemoryArtistStore implements ArtistStore {
  findMany(): Artist[] {
    return artists;
  }
}
