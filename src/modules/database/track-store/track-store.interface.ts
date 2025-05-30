import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/modules/track/dto/update-track.dto';
import { Track } from 'src/modules/track/entities/track.entity';

export interface TrackStore {
  findMany: () => Track[];
  findUnique: (id: string) => Track;
  create: (dto: CreateTrackDto) => Track;
  update: (id: string, dto: UpdateTrackDto) => Track;
  delete: (id: string) => void;
}
