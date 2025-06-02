import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TrackModule, AlbumModule, FavoriteModule],
  exports: [ArtistService],
})
export class ArtistModule {}
