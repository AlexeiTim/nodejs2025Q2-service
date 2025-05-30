import { Track } from 'src/modules/track/entities/track.entity';

export interface TrackStore {
  findMany: () => Track[];
}
