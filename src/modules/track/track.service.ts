import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';
import { TrackNotFoundException } from './exceptions/track-not-found.exception';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.databaseService.tracks.create(createTrackDto);
  }

  findAll() {
    return this.databaseService.tracks.findMany();
  }

  findOne(id: string) {
    const track = this.databaseService.tracks.findUnique(id);
    if (!track) throw new TrackNotFoundException();
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.databaseService.tracks.findUnique(id);
    if (!track) throw new TrackNotFoundException();
    return this.databaseService.tracks.update(id, updateTrackDto);
  }

  remove(id: string) {
    const track = this.databaseService.tracks.findUnique(id);
    if (!track) throw new TrackNotFoundException();
    return this.databaseService.tracks.delete(id);
  }
}
