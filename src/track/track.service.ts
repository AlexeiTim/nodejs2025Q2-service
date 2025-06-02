import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';
import { TrackNotFoundException } from './exceptions/track-not-found.exception';
import { FavoriteService } from 'src/favorite/favorite.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly favoritesService: FavoriteService,
  ) {}

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
    this.databaseService.tracks.delete(id);
    this.databaseService.favorites.removeTrack(id);
  }

  clearArtistId(id: string) {
    const tracks = this.databaseService.tracks.findMany();
    const tracksWithArtistId = tracks.filter((track) => track.artistId === id);
    tracksWithArtistId.forEach((track) => {
      this.databaseService.tracks.update(track.id, {
        ...track,
        artistId: null,
      });
    });
  }

  clearAlbumId(id: string) {
    const tracks = this.databaseService.tracks.findMany();
    const tracksWithAlbumId = tracks.filter((track) => track.albumId === id);
    tracksWithAlbumId.forEach((track) => {
      this.databaseService.tracks.update(track.id, {
        ...track,
        albumId: null,
      });
    });
  }
}
