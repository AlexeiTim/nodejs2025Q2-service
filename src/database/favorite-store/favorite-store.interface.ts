import { Favorite } from 'src/favorite/entities/favorite.entity';

export interface FavoriteStore {
  getFavorites: () => Favorite;
  addArtist: (id: string) => void;
  addAlbum: (id: string) => void;
  addTrack: (id: string) => void;
  removeArtist: (id: string) => void;
  removeAlbum: (id: string) => void;
  removeTrack: (id: string) => void;
  getArtist: (id: string) => string;
  getAlbum: (id: string) => string;
  getTrack: (id: string) => string;
}
