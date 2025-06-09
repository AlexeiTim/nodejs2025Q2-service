import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Artist } from 'src/artist/entities/artist.entity';
import { ArtistStore } from './artist-store.interface';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { ArtistNotFoundException } from 'src/artist/exceptions/artist-not-found.exception';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaArtistStore implements ArtistStore {
  constructor(private prisma: PrismaService) {}

  private mapToArtist(prismaArtist: any): Artist {
    return {
      id: prismaArtist.id,
      name: prismaArtist.name,
      grammy: prismaArtist.grammy,
      createdAt: prismaArtist.createdAt,
      updatedAt: prismaArtist.updatedAt,
    };
  }

  async findMany(): Promise<Artist[]> {
    try {
      const artists = await this.prisma.artist.findMany();
      return artists.map(this.mapToArtist);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async findUnique(id: string): Promise<Artist> {
    try {
      const artist = await this.prisma.artist.findUnique({
        where: { id },
      });
      if (!artist) {
        throw new ArtistNotFoundException();
      }
      return this.mapToArtist(artist);
    } catch (error) {
      if (error instanceof ArtistNotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async create(dto: CreateArtistDto): Promise<Artist> {
    try {
      const artist = await this.prisma.artist.create({
        data: {
          name: dto.name,
          grammy: dto.grammy,
        },
      });
      return this.mapToArtist(artist);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Artist with this name already exists');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {
    try {
      const artist = await this.prisma.artist.findUnique({
        where: { id },
      });

      if (!artist) {
        throw new ArtistNotFoundException();
      }

      const updatedArtist = await this.prisma.artist.update({
        where: { id },
        data: dto,
      });
      return this.mapToArtist(updatedArtist);
    } catch (error) {
      if (error instanceof ArtistNotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Artist with this name already exists');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.artist.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ArtistNotFoundException();
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }
}
