import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { TrackStore } from './track-store.interface';
import { Track } from 'src/modules/track/entities/track.entity';
import { randomUUID } from 'crypto';

const TEST_TRACK: Track = {
  id: 'fc3142ad-a6c2-4688-b635-b846d8324f0a',
  albumId: null,
  artistId: null,
  duration: 1,
  name: 'test',
};

const tracks: Track[] = [TEST_TRACK];

export class InMemoryTrackStore implements TrackStore {
  findMany(): Track[] {
    return tracks;
  }

  findUnique(id: string) {
    return tracks.find((track) => track.id === id);
  }

  create(dto: CreateTrackDto) {
    const newTrack: Track = {
      id: randomUUID(),
      ...dto,
    };
    tracks.push(newTrack);
    return newTrack;
  }
}
