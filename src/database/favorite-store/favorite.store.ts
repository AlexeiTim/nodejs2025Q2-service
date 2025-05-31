import { Favorite } from 'src/favorite/entities/favorite.entity';
import { FavoriteStore } from './favorite-store.interface';

const TEST_FAVORITE: Favorite = {
  albums: [],
  artists: [],
  tracks: [],
};

const favorites: Favorite[] = [TEST_FAVORITE];

export class InMemoryFavoriteStore implements FavoriteStore {
  findMany(): Favorite[] {
    return favorites;
  }
}
