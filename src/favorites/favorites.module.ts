import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { PrismaFavoritesStore } from 'src/database/favorites-store/favorites.store';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaFavoritesStore],
  exports: [FavoritesService],
})
export class FavoritesModule {}
