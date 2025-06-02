import { Track } from '../entities/track.entity';

export class TrackResponseDto {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(track: Track) {
    Object.assign(this, track);
  }
}
