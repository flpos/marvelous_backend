import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: true })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  id: number;

  @Column(DataType.STRING)
  @ApiProperty()
  username: number;

  @Column(DataType.STRING)
  @ApiProperty()
  password: string;

  toJSON() {
    const user = { ...this.get() };
    delete user.password;
    return user;
  }
}
