import { Inject, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject('FAVORITES_REPOSITORY') private favoriteRepository: typeof Favorite,
  ) {}

  create(createFavoriteDto: CreateFavoriteDto, userId: number) {
    return this.favoriteRepository.create({ ...createFavoriteDto, userId });
  }

  findAll(userId: number) {
    return this.favoriteRepository.findAll({ where: { userId } });
  }

  findOne(id: number, userId: number) {
    return this.favoriteRepository.findOne({ where: { id, userId } });
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto, userId: number) {
    return this.favoriteRepository.update(updateFavoriteDto, {
      where: { id, userId },
    });
  }

  remove(marvelId: string, userId: number) {
    return this.favoriteRepository.destroy({ where: { marvelId, userId } });
  }
}
