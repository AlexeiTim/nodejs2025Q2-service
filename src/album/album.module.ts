import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
  imports: [TrackModule, FavoriteModule],
})
export class AlbumModule {}
