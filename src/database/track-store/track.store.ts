import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { TrackStore } from './track-store.interface';
import { Track } from 'src/track/entities/track.entity';
import { randomUUID } from 'crypto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

const TEST_TRACK: Track = {
  id: 'fc3142ad-a6c2-4688-b635-b846d8324f0a',
  albumId: null,
  artistId: null,
  duration: 1,
  name: 'test',
};

export const tracks: Track[] = [TEST_TRACK];

export class InMemoryTrackStore implements TrackStore {
  delete(id: string) {
    const trackIndex = tracks.findIndex((track) => track.id === id);
    tracks.splice(trackIndex, 1);
  }
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

  update(id: string, dto: UpdateTrackDto) {
    const trackIndex = tracks.findIndex((track) => track.id === id);
    const track = tracks[trackIndex];
    const updatedTrack: Track = {
      ...track,
      albumId: dto.albumId || null,
      artistId: dto.artistId || null,
      duration: dto.duration,
      name: dto.name,
    };
    tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  remove(id: string) {
    const trackIndex = tracks.findIndex((track) => track.id === id);
    tracks.splice(trackIndex, 1);
  }
}
