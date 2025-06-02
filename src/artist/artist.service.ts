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
    private trackService: TrackService,
    private albumService: AlbumService,
    private favoriteService: FavoriteService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.databaseService.artists.create(createArtistDto);
  }

  findAll() {
    return this.databaseService.artists.findMany();
  }

  findOne(id: string) {
    const artist = this.databaseService.artists.findUnique(id);
    if (!artist) throw new ArtistNotFoundException();
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.databaseService.artists.findUnique(id);
    if (!artist) throw new ArtistNotFoundException();
    return this.databaseService.artists.update(id, updateArtistDto);
  }

  remove(id: string) {
    const artist = this.databaseService.artists.findUnique(id);
    if (!artist) throw new ArtistNotFoundException();
    this.databaseService.artists.delete(id);
    this.trackService.clearArtistId(id);
    this.albumService.clearArtistId(id);
    this.favoriteService.removeArtist(id);
  }
}
