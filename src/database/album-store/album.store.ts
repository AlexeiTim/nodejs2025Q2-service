import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Album } from 'src/album/entities/album.entity';
import { AlbumStore } from './album-store.interface';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { AlbumNotFoundException } from 'src/album/exceptions/album-not-found.exception';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaAlbumStore implements AlbumStore {
  constructor(private prisma: PrismaService) {}

  private mapToAlbum(prismaAlbum: any): Album {
    return {
      id: prismaAlbum.id,
      name: prismaAlbum.name,
      year: prismaAlbum.year,
      artistId: prismaAlbum.artistId,
      createdAt: prismaAlbum.createdAt,
      updatedAt: prismaAlbum.updatedAt,
    };
  }

  async findMany(): Promise<Album[]> {
    try {
      const albums = await this.prisma.album.findMany();
      return albums.map(this.mapToAlbum);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async findUnique(id: string): Promise<Album> {
    try {
      const album = await this.prisma.album.findUnique({
        where: { id },
      });
      if (!album) {
        throw new AlbumNotFoundException();
      }
      return this.mapToAlbum(album);
    } catch (error) {
      if (error instanceof AlbumNotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async create(dto: CreateAlbumDto): Promise<Album> {
    try {
      const album = await this.prisma.album.create({
        data: {
          name: dto.name,
          year: dto.year,
          artistId: dto.artistId || null,
        },
      });
      return this.mapToAlbum(album);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Album with this name already exists');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
    try {
      const album = await this.prisma.album.findUnique({
        where: { id },
      });

      if (!album) {
        throw new AlbumNotFoundException();
      }

      const updatedAlbum = await this.prisma.album.update({
        where: { id },
        data: dto,
      });
      return this.mapToAlbum(updatedAlbum);
    } catch (error) {
      if (error instanceof AlbumNotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Album with this name already exists');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.album.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AlbumNotFoundException();
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }
}
