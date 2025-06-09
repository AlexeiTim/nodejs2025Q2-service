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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistParamsDto } from './dto/artist-params.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: ArtistParamsDto) {
    return await this.artistService.findOne(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: ArtistParamsDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: ArtistParamsDto) {
    await this.artistService.remove(params.id);
  }
}
