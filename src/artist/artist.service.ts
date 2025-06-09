import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from '../database/database.service';
import { ArtistNotFoundException } from './exceptions/artist-not-found.exception';
import { TrackService } from '../track/track.service';
import { AlbumService } from 'src/album/album.service';
import { FavoriteService } from 'src/favorite/favorite.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favoriteService: FavoriteService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    try {
      return await this.databaseService.artists.create(createArtistDto);
    } catch (error) {
      throw new Error(`Failed to create artist: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.artists.findMany();
    } catch (error) {
      throw new Error(`Failed to find artists: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const artist = await this.databaseService.artists.findUnique(id);
      if (!artist) {
        throw new ArtistNotFoundException();
      }
      return artist;
    } catch (error) {
      if (error instanceof ArtistNotFoundException) {
        throw error;
      }
      throw new Error(`Failed to find artist: ${error.message}`);
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const artist = await this.databaseService.artists.findUnique(id);
      if (!artist) {
        throw new ArtistNotFoundException();
      }
      return await this.databaseService.artists.update(id, updateArtistDto);
    } catch (error) {
      if (error instanceof ArtistNotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update artist: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const artist = await this.databaseService.artists.findUnique(id);
      if (!artist) {
        throw new ArtistNotFoundException();
      }

      try {
        await this.favoriteService.removeArtist(id);
      } catch (error) {}

      await Promise.all([
        this.trackService.clearArtistId(id),
        this.albumService.clearArtistId(id),
      ]);

      await this.databaseService.artists.delete(id);
    } catch (error) {
      if (error instanceof ArtistNotFoundException) {
        throw error;
      }
      throw new Error(`Failed to remove artist: ${error.message}`);
    }
  }
}
