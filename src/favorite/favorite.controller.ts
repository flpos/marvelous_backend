import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserId } from 'src/user/decorators/userId.decorator';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoriteService } from './favorite.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Favorites')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @UserId() userId: number,
  ) {
    return this.favoriteService.create(createFavoriteDto, userId);
  }

  @Get()
  findAll(@UserId() userId: number) {
    return this.favoriteService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserId() userId: number) {
    return this.favoriteService.findOne(+id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
    @UserId() userId: number,
  ) {
    return this.favoriteService.update(+id, updateFavoriteDto, userId);
  }

  @Delete(':marvelId')
  remove(@Param('marvelId') marvelId: string, @UserId() userId: number) {
    return this.favoriteService.remove(marvelId, userId);
  }
}
