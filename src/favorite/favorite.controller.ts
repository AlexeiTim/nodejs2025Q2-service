import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteParamsDto } from './dto/favorite-params.dto';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('artist/:id')
  addArtist(@Param() params: FavoriteParamsDto) {
    return this.favoriteService.addArtist(params.id);
  }

  @Post('album/:id')
  addAlbum(@Param() params: FavoriteParamsDto) {
    return this.favoriteService.addAlbum(params.id);
  }

  @Post('track/:id')
  addTrack(@Param() params: FavoriteParamsDto) {
    return this.favoriteService.addTrack(params.id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param() params: FavoriteParamsDto) {
    return this.favoriteService.removeArtist(params.id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param() params: FavoriteParamsDto) {
    return this.favoriteService.removeAlbum(params.id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param() params: FavoriteParamsDto) {
    return this.favoriteService.removeTrack(params.id);
  }
}
