import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Track } from 'src/track/entities/track.entity';
import { TrackStore } from './track-store.interface';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { TrackNotFoundException } from 'src/track/exceptions/track-not-found.exception';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaTrackStore implements TrackStore {
  constructor(private prisma: PrismaService) {}

  private mapToTrack(prismaTrack: any): Track {
    return {
      id: prismaTrack.id,
      name: prismaTrack.name,
      artistId: prismaTrack.artistId,
      albumId: prismaTrack.albumId,
      duration: prismaTrack.duration,
      createdAt: prismaTrack.createdAt,
      updatedAt: prismaTrack.updatedAt,
    };
  }

  async findMany(): Promise<Track[]> {
    try {
      const tracks = await this.prisma.track.findMany();
      return tracks.map(this.mapToTrack);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async findUnique(id: string): Promise<Track> {
    try {
      const track = await this.prisma.track.findUnique({
        where: { id },
      });
      if (!track) {
        throw new TrackNotFoundException();
      }
      return this.mapToTrack(track);
    } catch (error) {
      if (error instanceof TrackNotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    try {
      if (dto.artistId) {
        const artist = await this.prisma.artist.findUnique({
          where: { id: dto.artistId },
        });
        if (!artist) {
          throw new Error('Artist not found');
        }
      }

      if (dto.albumId) {
        const album = await this.prisma.album.findUnique({
          where: { id: dto.albumId },
        });
        if (!album) {
          throw new Error('Album not found');
        }

        const existingTrack = await this.prisma.track.findFirst({
          where: {
            name: dto.name,
            albumId: dto.albumId,
          },
        });
        if (existingTrack) {
          throw new Error('Track with this name already exists in this album');
        }
      }

      const track = await this.prisma.track.create({
        data: {
          name: dto.name,
          duration: dto.duration,
          artistId: dto.artistId || null,
          albumId: dto.albumId || null,
        },
      });
      return this.mapToTrack(track);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Track with this name already exists');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track> {
    try {
      const track = await this.prisma.track.findUnique({
        where: { id },
      });

      if (!track) {
        throw new TrackNotFoundException();
      }

      if (dto.artistId) {
        const artist = await this.prisma.artist.findUnique({
          where: { id: dto.artistId },
        });
        if (!artist) {
          throw new Error('Artist not found');
        }
      }

      if (dto.albumId) {
        const album = await this.prisma.album.findUnique({
          where: { id: dto.albumId },
        });
        if (!album) {
          throw new Error('Album not found');
        }

        if (dto.name) {
          const existingTrack = await this.prisma.track.findFirst({
            where: {
              name: dto.name,
              albumId: dto.albumId,
              id: { not: id },
            },
          });
          if (existingTrack) {
            throw new Error(
              'Track with this name already exists in this album',
            );
          }
        }
      }

      const updatedTrack = await this.prisma.track.update({
        where: { id },
        data: dto,
      });
      return this.mapToTrack(updatedTrack);
    } catch (error) {
      if (error instanceof TrackNotFoundException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Track with this name already exists');
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.track.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new TrackNotFoundException();
        }
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }
}
