import { Favorite } from 'src/favorite/entities/favorite.entity';
import { FavoriteStore } from './favorite-store.interface';

const TEST_FAVORITE: Favorite = {
  albums: [],
  artists: [],
  tracks: [],
};

const favorites: Favorite = TEST_FAVORITE;

export class InMemoryFavoriteStore implements FavoriteStore {
  getFavorites(): Favorite {
    return favorites;
  }

  addArtist(id: string) {
    favorites.artists.push(id);
  }

  addAlbum(id: string) {
    favorites.albums.push(id);
  }

  addTrack(id: string) {
    favorites.tracks.push(id);
  }

  getArtist(id: string) {
    return favorites.artists.find((artistId) => artistId === id);
  }

  getTrack(id: string) {
    return favorites.tracks.find((trackId) => trackId === id);
  }

  getAlbum(id: string) {
    return favorites.albums.find((albumId) => albumId === id);
  }

  removeArtist(id: string) {
    const index = favorites.artists.findIndex((artistId) => artistId === id);
    favorites.artists.splice(index, 1);
  }

  removeAlbum(id: string) {
    const index = favorites.albums.findIndex((albumId) => albumId === id);
    favorites.albums.splice(index, 1);
  }

  removeTrack(id: string) {
    const index = favorites.tracks.findIndex((trackId) => trackId === id);
    favorites.tracks.splice(index, 1);
  }
}
