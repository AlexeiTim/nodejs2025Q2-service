import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { AlbumNotFoundException } from './exceptions/album-not-found.exception';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly tracksService: TrackService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.databaseService.albums.create(createAlbumDto);
  }

  findAll() {
    return this.databaseService.albums.findMany();
  }

  findOne(id: string) {
    const album = this.databaseService.albums.findUnique(id);
    if (!album) throw new AlbumNotFoundException();
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.databaseService.albums.findUnique(id);
    if (!album) throw new AlbumNotFoundException();
    return this.databaseService.albums.update(id, updateAlbumDto);
  }

  remove(id: string) {
    const album = this.databaseService.albums.findUnique(id);
    if (!album) throw new AlbumNotFoundException();
    this.databaseService.albums.delete(id);
    this.tracksService.clearAlbumId(id);
  }

  clearArtistId(id: string) {
    const albums = this.databaseService.albums.findMany();
    const albumsWithArtistId = albums.filter((album) => album.artistId === id);
    albumsWithArtistId.forEach((album) => {
      this.databaseService.albums.update(album.id, {
        ...album,
        artistId: null,
      });
    });
  }
}
