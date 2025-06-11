import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Favorites } from 'src/favorites/entities/favorites.entity';
import { Prisma } from '@prisma/client';
import { FavoritesStore } from './favorites-store.interface';

@Injectable()
export class PrismaFavoritesStore implements FavoritesStore {
  constructor(private prisma: PrismaService) {}

  private mapToFavorites(prismaFavorites: any): Favorites {
    return {
      id: prismaFavorites.id,
      artists: prismaFavorites.artists.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        grammy: artist.grammy,
        createdAt: artist.createdAt,
        updatedAt: artist.updatedAt,
      })),
      albums: prismaFavorites.albums.map((album: any) => ({
        id: album.id,
        name: album.name,
        year: album.year,
        artistId: album.artistId,
        createdAt: album.createdAt,
        updatedAt: album.updatedAt,
      })),
      tracks: prismaFavorites.tracks.map((track: any) => ({
        id: track.id,
        name: track.name,
        artistId: track.artistId,
        albumId: track.albumId,
        duration: track.duration,
        createdAt: track.createdAt,
        updatedAt: track.updatedAt,
      })),
    };
  }

  async findMany(): Promise<Favorites[]> {
    try {
      const favorites = await this.prisma.favorites.findMany({
        include: {
          artists: true,
          albums: true,
          tracks: true,
        },
      });
      return favorites.map(this.mapToFavorites);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async findUnique(id: string): Promise<Favorites> {
    try {
      const favorites = await this.prisma.favorites.findUnique({
        where: { id },
        include: {
          artists: true,
          albums: true,
          tracks: true,
        },
      });
      if (!favorites) {
        throw new Error('Favorites not found');
      }
      return this.mapToFavorites(favorites);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async create(): Promise<Favorites> {
    try {
      const favorites = await this.prisma.favorites.create({
        data: {},
        include: {
          artists: true,
          albums: true,
          tracks: true,
        },
      });
      return this.mapToFavorites(favorites);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async addArtist(favoritesId: string, artistId: string): Promise<void> {
    try {
      await this.prisma.favorites.update({
        where: { id: favoritesId },
        data: {
          artists: {
            connect: { id: artistId },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Artist or Favorites not found');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async removeArtist(favoritesId: string, artistId: string): Promise<void> {
    try {
      await this.prisma.favorites.update({
        where: { id: favoritesId },
        data: {
          artists: {
            disconnect: { id: artistId },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Artist or Favorites not found');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async addAlbum(favoritesId: string, albumId: string): Promise<void> {
    try {
      await this.prisma.favorites.update({
        where: { id: favoritesId },
        data: {
          albums: {
            connect: { id: albumId },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Album or Favorites not found');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async removeAlbum(favoritesId: string, albumId: string): Promise<void> {
    try {
      await this.prisma.favorites.update({
        where: { id: favoritesId },
        data: {
          albums: {
            disconnect: { id: albumId },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Album or Favorites not found');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async addTrack(favoritesId: string, trackId: string): Promise<void> {
    try {
      await this.prisma.favorites.update({
        where: { id: favoritesId },
        data: {
          tracks: {
            connect: { id: trackId },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Track or Favorites not found');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async removeTrack(favoritesId: string, trackId: string): Promise<void> {
    try {
      await this.prisma.favorites.update({
        where: { id: favoritesId },
        data: {
          tracks: {
            disconnect: { id: trackId },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Track or Favorites not found');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.favorites.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Favorites not found');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }
}
