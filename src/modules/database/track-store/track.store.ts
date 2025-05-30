import { TrackStore } from './track-store.interface';
import { Track } from 'src/modules/track/entities/track.entity';

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
}
