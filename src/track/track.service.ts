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

  async create(createTrackDto: CreateTrackDto) {
    return this.databaseService.tracks.create(createTrackDto);
  }

  async findAll() {
    return this.databaseService.tracks.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.databaseService.tracks.findUnique(id);
    } catch (error) {
      if (error instanceof TrackNotFoundException) {
        throw error;
      }
      throw new TrackNotFoundException();
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.databaseService.tracks.update(id, updateTrackDto);
    } catch (error) {
      if (error instanceof TrackNotFoundException) {
        throw error;
      }
      throw new TrackNotFoundException();
    }
  }

  async remove(id: string) {
    try {
      try {
        await this.favoritesService.removeTrack(id);
      } catch (error) {}

      await this.databaseService.tracks.delete(id);
    } catch (error) {
      if (error instanceof TrackNotFoundException) {
        throw error;
      }
      throw new TrackNotFoundException();
    }
  }

  async clearArtistId(id: string) {
    try {
      const tracks = await this.databaseService.tracks.findMany();
      const tracksWithArtistId = tracks.filter(
        (track) => track.artistId === id,
      );

      for (const track of tracksWithArtistId) {
        await this.databaseService.tracks.update(track.id, {
          artistId: null,
        });
      }
    } catch (error) {
      throw new Error(`Failed to clear artist ID: ${error.message}`);
    }
  }

  async clearAlbumId(id: string) {
    try {
      const tracks = await this.databaseService.tracks.findMany();
      const tracksWithAlbumId = tracks.filter((track) => track.albumId === id);

      for (const track of tracksWithAlbumId) {
        await this.databaseService.tracks.update(track.id, {
          albumId: null,
        });
      }
    } catch (error) {
      throw new Error(`Failed to clear album ID: ${error.message}`);
    }
  }
}
