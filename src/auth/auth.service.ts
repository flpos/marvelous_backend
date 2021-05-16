import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new BadRequestException('Usuário não encontrado');
    if (bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    throw new BadRequestException('Credenciais inválidas');
  }

  async login(user: LoginUserDto) {
    const userInDb = await this.validateUser(user.username, user.password);
    const payload = { userId: userInDb.id, username: userInDb.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
