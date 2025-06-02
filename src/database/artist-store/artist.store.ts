import { Artist } from 'src/artist/entities/artist.entity';
import { ArtistStore } from './artist-store.interface';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { randomUUID } from 'crypto';

const TEST_ARTIST: Artist = {
  id: 'fc3142ad-a6c2-4688-b635-b846d8324f0a',
  name: 'test',
  grammy: true,
};

const artists: Artist[] = [TEST_ARTIST];

export class InMemoryArtistStore implements ArtistStore {
  update(id: string, dto: UpdateArtistDto) {
    const artistIndex = artists.findIndex((artist) => artist.id === id);
    const artist = artists[artistIndex];
    const updatedArtist = {
      ...artist,
      ...dto,
    };
    artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }

  delete(id: string) {
    const artistIndex = artists.findIndex((artist) => artist.id === id);
    artists.splice(artistIndex, 1);
  }

  findMany(): Artist[] {
    return artists;
  }

  findUnique(id: string) {
    return artists.find((artist) => artist.id === id);
  }

  create(dto: CreateArtistDto) {
    const newArtist: Artist = {
      id: randomUUID(),
      grammy: dto.grammy || false,
      name: dto.name,
    };
    artists.push(newArtist);
    return newArtist;
  }
}
