import { Inject, Injectable } from '@nestjs/common';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return this.userRepository.findAll({ include: [Favorite] });
  }

  findOne(id: number) {
    return this.userRepository.findByPk(id, { include: [Favorite] });
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(updateUserDto, { where: { id } });
  }

  remove(id: number) {
    return this.userRepository.destroy({ where: { id } });
  }
}
