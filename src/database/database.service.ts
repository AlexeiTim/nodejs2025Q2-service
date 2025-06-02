import { Injectable } from '@nestjs/common';
import { Database } from './interfaces/database.interface';
import { InMemoryUserStore } from './user-store/user.store';
import { UserStore } from './user-store/user-store.interface';
import { TrackStore } from './track-store/track-store.interface';
import { InMemoryTrackStore } from './track-store/track.store';
import { ArtistStore } from './artist-store/artist-store.interface';
import { InMemoryArtistStore } from './artist-store/artist.store';
import { AlbumStore } from './album-store/album-store.interface';
import { InMemoryAlbumsStore } from './album-store/album.store';
import { FavoriteStore } from './favorite-store/favorite-store.interface';
import { InMemoryFavoriteStore } from './favorite-store/favorite.store';

@Injectable()
export class DatabaseService implements Database {
  users: UserStore;
  tracks: TrackStore;
  artists: ArtistStore;
  albums: AlbumStore;
  favorites: FavoriteStore;

  constructor() {
    this.users = new InMemoryUserStore();
    this.tracks = new InMemoryTrackStore();
    this.artists = new InMemoryArtistStore();
    this.albums = new InMemoryAlbumsStore();
    this.favorites = new InMemoryFavoriteStore();
  }
}
