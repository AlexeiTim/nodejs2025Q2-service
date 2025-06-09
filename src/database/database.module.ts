import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaTrackStore } from './track-store/track.store';
import { PrismaArtistStore } from './artist-store/artist.store';
import { PrismaAlbumStore } from './album-store/album.store';
import { PrismaFavoritesStore } from './favorites-store/favorites.store';

@Global()
@Module({
  providers: [
    DatabaseService,
    PrismaTrackStore,
    PrismaArtistStore,
    PrismaAlbumStore,
    PrismaFavoritesStore,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
