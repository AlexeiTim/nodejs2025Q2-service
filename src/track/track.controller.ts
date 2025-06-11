import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackParamsDto } from './dto/track-params.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: TrackParamsDto) {
    return this.trackService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: TrackParamsDto,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: TrackParamsDto) {
    return this.trackService.remove(params.id);
  }
}
