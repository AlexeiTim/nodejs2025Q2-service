import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ArtistNotFoundException } from 'src/artist/exceptions/artist-not-found.exception';
import { AlbumNotFoundException } from 'src/album/exceptions/album-not-found.exception';
import { TrackNotFoundException } from 'src/track/exceptions/track-not-found.exception';

@Injectable()
export class FavoriteService {
  private favoritesId: string;

  constructor(private readonly databaseService: DatabaseService) {
    this.initializeFavorites();
  }

  private removeTimestamps(obj: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, ...rest } = obj;
    return rest;
  }

  private async initializeFavorites() {
    try {
      const favorites = await this.databaseService.favorites.findMany();
      if (favorites.length === 0) {
        const newFavorites = await this.databaseService.favorites.create();
        this.favoritesId = newFavorites.id;
      } else {
        this.favoritesId = favorites[0].id;
      }
    } catch (error) {
      throw new HttpException(
        'Failed to initialize favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const favorites = await this.databaseService.favorites.findUnique(
        this.favoritesId,
      );

      const [albums, artists, tracks] = await Promise.all([
        Promise.all(
          favorites.albums.map((album) =>
            this.databaseService.albums.findUnique(album.id),
          ),
        ),
        Promise.all(
          favorites.artists.map((artist) =>
            this.databaseService.artists.findUnique(artist.id),
          ),
        ),
        Promise.all(
          favorites.tracks.map((track) =>
            this.databaseService.tracks.findUnique(track.id),
          ),
        ),
      ]);

      return {
        albums: albums
          .filter((album) => album !== null)
          .map(this.removeTimestamps),
        artists: artists
          .filter((artist) => artist !== null)
          .map(this.removeTimestamps),
        tracks: tracks
          .filter((track) => track !== null)
          .map(this.removeTimestamps),
      };
    } catch (error) {
      throw new HttpException(
        'Failed to get favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addArtist(id: string) {
    try {
      const artist = await this.databaseService.artists.findUnique(id);
      if (!artist) {
        throw new ArtistNotFoundException();
      }
      await this.databaseService.favorites.addArtist(this.favoritesId, id);
      return this.removeTimestamps(artist);
    } catch (error) {
      if (error instanceof ArtistNotFoundException) {
        throw new HttpException(
          'Artist not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw new HttpException(
        'Failed to add artist to favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addAlbum(id: string) {
    try {
      const album = await this.databaseService.albums.findUnique(id);
      if (!album) {
        throw new AlbumNotFoundException();
      }
      await this.databaseService.favorites.addAlbum(this.favoritesId, id);
      return this.removeTimestamps(album);
    } catch (error) {
      if (error instanceof AlbumNotFoundException) {
        throw new HttpException(
          'Album not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw new HttpException(
        'Failed to add album to favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addTrack(id: string) {
    try {
      const track = await this.databaseService.tracks.findUnique(id);
      if (!track) {
        throw new TrackNotFoundException();
      }
      await this.databaseService.favorites.addTrack(this.favoritesId, id);
      return this.removeTimestamps(track);
    } catch (error) {
      if (error instanceof TrackNotFoundException) {
        throw new HttpException(
          'Track not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw new HttpException(
        'Failed to add track to favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeArtist(id: string) {
    try {
      const favorites = await this.databaseService.favorites.findUnique(
        this.favoritesId,
      );
      if (!favorites.artists.some((artist) => artist.id === id)) {
        throw new HttpException(
          'Artist not found in favorites',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.databaseService.favorites.removeArtist(this.favoritesId, id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to remove artist from favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeAlbum(id: string) {
    try {
      const favorites = await this.databaseService.favorites.findUnique(
        this.favoritesId,
      );
      if (!favorites.albums.some((album) => album.id === id)) {
        throw new HttpException(
          'Album not found in favorites',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.databaseService.favorites.removeAlbum(this.favoritesId, id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to remove album from favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeTrack(id: string) {
    try {
      const favorites = await this.databaseService.favorites.findUnique(
        this.favoritesId,
      );
      if (!favorites.tracks.some((track) => track.id === id)) {
        throw new HttpException(
          'Track not found in favorites',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.databaseService.favorites.removeTrack(this.favoritesId, id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to remove track from favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
