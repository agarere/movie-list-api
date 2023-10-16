import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);

    if (user && user.password === password) {
      // user verisi içinde userId, username ve password bulunuyor.
      // Bu tanımlama ile result verisi içinde userId ve username olmasını sağlıyoruz.
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async loginWithCredentials(user: any) {
    // Jwt oluştururken payload verisi gerekiyor. 
    // Bunu da kullanıcıya özel yapabilmek adına username ve userId verilerini kullandık.
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}