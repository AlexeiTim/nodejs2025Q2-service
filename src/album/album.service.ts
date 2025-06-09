import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { AlbumNotFoundException } from './exceptions/album-not-found.exception';
import { TrackService } from 'src/track/track.service';
import { FavoriteService } from 'src/favorite/favorite.service';
import { ArtistNotFoundException } from 'src/artist/exceptions/artist-not-found.exception';

@Injectable()
export class AlbumService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly tracksService: TrackService,
    private readonly favoriteService: FavoriteService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    try {
      if (createAlbumDto.artistId) {
        const artist = await this.databaseService.artists.findUnique(
          createAlbumDto.artistId,
        );
        if (!artist) {
          throw new ArtistNotFoundException();
        }
      }

      return await this.databaseService.albums.create(createAlbumDto);
    } catch (error) {
      if (error instanceof ArtistNotFoundException) {
        throw error;
      }
      throw new Error(`Failed to create album: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.albums.findMany();
    } catch (error) {
      throw new Error(`Failed to get albums: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const album = await this.databaseService.albums.findUnique(id);
      if (!album) {
        throw new AlbumNotFoundException();
      }
      return album;
    } catch (error) {
      if (error instanceof AlbumNotFoundException) {
        throw error;
      }
      throw new Error(`Failed to get album: ${error.message}`);
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      const album = await this.databaseService.albums.findUnique(id);
      if (!album) {
        throw new AlbumNotFoundException();
      }

      if (updateAlbumDto.artistId) {
        const artist = await this.databaseService.artists.findUnique(
          updateAlbumDto.artistId,
        );
        if (!artist) {
          throw new ArtistNotFoundException();
        }
      }

      return await this.databaseService.albums.update(id, updateAlbumDto);
    } catch (error) {
      if (
        error instanceof AlbumNotFoundException ||
        error instanceof ArtistNotFoundException
      ) {
        throw error;
      }
      throw new Error(`Failed to update album: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const album = await this.databaseService.albums.findUnique(id);
      if (!album) {
        throw new AlbumNotFoundException();
      }

      try {
        await this.favoriteService.removeAlbum(id);
      } catch (error) {}

      await this.tracksService.clearAlbumId(id);

      await this.databaseService.albums.delete(id);
    } catch (error) {
      if (error instanceof AlbumNotFoundException) {
        throw error;
      }
      throw new Error(`Failed to remove album: ${error.message}`);
    }
  }

  async clearArtistId(id: string) {
    try {
      const albums = await this.databaseService.albums.findMany();
      const albumsWithArtistId = albums.filter(
        (album) => album.artistId === id,
      );

      for (const album of albumsWithArtistId) {
        await this.databaseService.albums.update(album.id, {
          name: album.name,
          year: album.year,
          artistId: null,
        });
      }
    } catch (error) {
      throw new Error(`Failed to clear artist ID: ${error.message}`);
    }
  }
}
