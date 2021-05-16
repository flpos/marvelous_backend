import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { favoritesProviders } from './favorite.providers';
import { FavoriteService } from './favorite.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, ...favoritesProviders],
})
export class FavoriteModule {}
