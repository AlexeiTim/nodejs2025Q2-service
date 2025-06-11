import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './entities/favorites.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<Favorites[]> {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id') id: string): Promise<void> {
    const favorites = await this.favoritesService.findAll();
    if (favorites.length === 0) {
      const newFavorites = await this.favoritesService.create();
      await this.favoritesService.addArtist(newFavorites.id, id);
    } else {
      await this.favoritesService.addArtist(favorites[0].id, id);
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id') id: string): Promise<void> {
    const favorites = await this.favoritesService.findAll();
    if (favorites.length > 0) {
      await this.favoritesService.removeArtist(favorites[0].id, id);
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id') id: string): Promise<void> {
    const favorites = await this.favoritesService.findAll();
    if (favorites.length === 0) {
      const newFavorites = await this.favoritesService.create();
      await this.favoritesService.addAlbum(newFavorites.id, id);
    } else {
      await this.favoritesService.addAlbum(favorites[0].id, id);
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id') id: string): Promise<void> {
    const favorites = await this.favoritesService.findAll();
    if (favorites.length > 0) {
      await this.favoritesService.removeAlbum(favorites[0].id, id);
    }
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id') id: string): Promise<void> {
    const favorites = await this.favoritesService.findAll();
    if (favorites.length === 0) {
      const newFavorites = await this.favoritesService.create();
      await this.favoritesService.addTrack(newFavorites.id, id);
    } else {
      await this.favoritesService.addTrack(favorites[0].id, id);
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id') id: string): Promise<void> {
    const favorites = await this.favoritesService.findAll();
    if (favorites.length > 0) {
      await this.favoritesService.removeTrack(favorites[0].id, id);
    }
  }
}
