import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeCreate,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Favorite } from 'src/favorite/entities/favorite.entity';

@Table({ timestamps: true })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  @ApiProperty()
  username: number;

  @Column(DataType.STRING)
  @ApiProperty()
  password: string;

  @HasMany(() => Favorite)
  favorites: Favorite[];

  toJSON() {
    const user = { ...this.get() };
    delete user.password;
    return user;
  }

  @BeforeCreate
  static async hashPassword(user: User) {
    const bcrypt = await import('bcrypt');
    user.password = await bcrypt.hash(user.password, 10);
    return user;
  }
}
