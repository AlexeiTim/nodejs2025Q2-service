import { Favorite } from 'src/favorite/entities/favorite.entity';

export interface FavoriteStore {
  findMany: () => Favorite[];
}
