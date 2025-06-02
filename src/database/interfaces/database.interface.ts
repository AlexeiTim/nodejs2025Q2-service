import { AlbumStore } from '../album-store/album-store.interface';
import { ArtistStore } from '../artist-store/artist-store.interface';
import { FavoriteStore } from '../favorite-store/favorite-store.interface';
import { TrackStore } from '../track-store/track-store.interface';
import { UserStore } from '../user-store/user-store.interface';

export interface Database {
  users: UserStore;
  tracks: TrackStore;
  artists: ArtistStore;
  albums: AlbumStore;
  favorites: FavoriteStore;
}
