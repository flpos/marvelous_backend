import { Favorite } from './entities/favorite.entity';

export const favoritesProviders = [
  {
    provide: 'FAVORITES_REPOSITORY',
    useValue: Favorite,
  },
];
