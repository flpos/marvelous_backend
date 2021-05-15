import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }
}
