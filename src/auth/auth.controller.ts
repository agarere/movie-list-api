import { Body, Controller, Post, Request, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { CryptoService } from 'src/crypto/crypto.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cryptoService: CryptoService,
    private readonly userService: UserService,
  ) {}
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.loginWithCredentials(req.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() userData: { username: string, email: string, firstname: string, lastname: string, password: string }): Promise<User> {
    const { username, email, password, firstname, lastname } = userData;
    const hashPassword = this.cryptoService.hashPassword(password)
    return this.userService.createUser(username, email, firstname, lastname, hashPassword);
  }
}
