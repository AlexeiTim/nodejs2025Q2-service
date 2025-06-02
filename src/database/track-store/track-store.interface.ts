import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';

export interface TrackStore {
  findMany: () => Track[];
  findUnique: (id: string) => Track;
  create: (dto: CreateTrackDto) => Track;
  update: (id: string, dto: UpdateTrackDto) => Track;
  delete: (id: string) => void;
}
