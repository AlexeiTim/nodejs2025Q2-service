import { Injectable } from '@nestjs/common';
import { PrismaFavoritesStore } from 'src/database/favorites-store/favorites.store';
import { Favorites } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesStore: PrismaFavoritesStore) {}

  async findAll(): Promise<Favorites[]> {
    return this.favoritesStore.findMany();
  }

  async findOne(id: string): Promise<Favorites> {
    return this.favoritesStore.findUnique(id);
  }

  async create(): Promise<Favorites> {
    return this.favoritesStore.create();
  }

  async addArtist(favoritesId: string, artistId: string): Promise<void> {
    await this.favoritesStore.addArtist(favoritesId, artistId);
  }

  async removeArtist(favoritesId: string, artistId: string): Promise<void> {
    await this.favoritesStore.removeArtist(favoritesId, artistId);
  }

  async addAlbum(favoritesId: string, albumId: string): Promise<void> {
    await this.favoritesStore.addAlbum(favoritesId, albumId);
  }

  async removeAlbum(favoritesId: string, albumId: string): Promise<void> {
    await this.favoritesStore.removeAlbum(favoritesId, albumId);
  }

  async addTrack(favoritesId: string, trackId: string): Promise<void> {
    await this.favoritesStore.addTrack(favoritesId, trackId);
  }

  async removeTrack(favoritesId: string, trackId: string): Promise<void> {
    await this.favoritesStore.removeTrack(favoritesId, trackId);
  }

  async remove(id: string): Promise<void> {
    await this.favoritesStore.delete(id);
  }
}
