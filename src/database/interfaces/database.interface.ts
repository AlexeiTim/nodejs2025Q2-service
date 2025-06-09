import { AlbumStore } from '../album-store/album-store.interface';
import { ArtistStore } from '../artist-store/artist-store.interface';
import { FavoritesStore } from '../favorites-store/favorites-store.interface';
import { TrackStore } from '../track-store/track-store.interface';

export interface Database {
  tracks: TrackStore;
  artists: ArtistStore;
  albums: AlbumStore;
  favorites: FavoritesStore;
}
