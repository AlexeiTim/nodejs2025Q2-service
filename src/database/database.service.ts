import { Injectable } from '@nestjs/common';
import { Database } from './interfaces/database.interface';
import { TrackStore } from './track-store/track-store.interface';
import { ArtistStore } from './artist-store/artist-store.interface';
import { AlbumStore } from './album-store/album-store.interface';
import { FavoritesStore } from './favorites-store/favorites-store.interface';
import { PrismaTrackStore } from './track-store/track.store';
import { PrismaArtistStore } from './artist-store/artist.store';
import { PrismaAlbumStore } from './album-store/album.store';
import { PrismaFavoritesStore } from './favorites-store/favorites.store';

@Injectable()
export class DatabaseService implements Database {
  tracks: TrackStore;
  artists: ArtistStore;
  albums: AlbumStore;
  favorites: FavoritesStore;

  constructor(
    private readonly trackStore: PrismaTrackStore,
    private readonly artistStore: PrismaArtistStore,
    private readonly albumStore: PrismaAlbumStore,
    private readonly favoritesStore: PrismaFavoritesStore,
  ) {
    this.tracks = trackStore;
    this.artists = artistStore;
    this.albums = albumStore;
    this.favorites = favoritesStore;
  }
}
