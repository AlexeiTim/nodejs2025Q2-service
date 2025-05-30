import { Favorite } from 'src/modules/favorite/entities/favorite.entity';

export interface FavoriteStore {
  findMany: () => Favorite[];
}
