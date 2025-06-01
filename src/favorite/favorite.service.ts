import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    const favorites = this.databaseService.favorites.getFavorites();
    return {
      albums: favorites.albums.map((albumId) =>
        this.databaseService.albums.findUnique(albumId),
      ),
      artists: favorites.artists.map((artistId) =>
        this.databaseService.artists.findUnique(artistId),
      ),
      tracks: favorites.tracks.map((trackId) =>
        this.databaseService.tracks.findUnique(trackId),
      ),
    };
  }

  addArtist(id: string) {
    const artist = this.databaseService.artists.findUnique(id);
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.databaseService.favorites.addArtist(id);
  }

  addAlbum(id: string) {
    const album = this.databaseService.albums.findUnique(id);
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.databaseService.favorites.addAlbum(id);
  }

  addTrack(id: string) {
    const track = this.databaseService.tracks.findUnique(id);
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.databaseService.favorites.addTrack(id);
  }

  removeArtist(id: string) {
    const artist = this.databaseService.artists.findUnique(id);
    if (!artist) {
      throw new HttpException('Artist doesnt exists', HttpStatus.NO_CONTENT);
    }
    return this.databaseService.favorites.removeArtist(id);
  }

  removeAlbum(id: string) {
    const album = this.databaseService.albums.findUnique(id);
    if (!album) {
      throw new HttpException('Album doesnt exists', HttpStatus.NO_CONTENT);
    }
    return this.databaseService.favorites.removeAlbum(id);
  }

  removeTrack(id: string) {
    const track = this.databaseService.tracks.findUnique(id);
    if (!track) {
      throw new HttpException('Track doesnt exists', HttpStatus.NO_CONTENT);
    }
    return this.databaseService.favorites.removeTrack(id);
  }
}
