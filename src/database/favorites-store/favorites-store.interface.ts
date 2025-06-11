import { Favorites } from 'src/favorites/entities/favorites.entity';

export interface FavoritesStore {
  findMany(): Promise<Favorites[]>;
  findUnique(id: string): Promise<Favorites>;
  create(): Promise<Favorites>;
  addArtist(favoritesId: string, artistId: string): Promise<void>;
  removeArtist(favoritesId: string, artistId: string): Promise<void>;
  addAlbum(favoritesId: string, albumId: string): Promise<void>;
  removeAlbum(favoritesId: string, albumId: string): Promise<void>;
  addTrack(favoritesId: string, trackId: string): Promise<void>;
  removeTrack(favoritesId: string, trackId: string): Promise<void>;
  delete(id: string): Promise<void>;
}
