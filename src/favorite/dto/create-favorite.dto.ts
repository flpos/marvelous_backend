import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty()
  marvelId: string;

  @ApiProperty()
  type: FavoriteTypes;
}
