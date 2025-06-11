import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumParamsDto } from './dto/album-params.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: AlbumParamsDto) {
    return this.albumService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: AlbumParamsDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: AlbumParamsDto) {
    return this.albumService.remove(params.id);
  }
}
