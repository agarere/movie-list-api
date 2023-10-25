import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    CryptoService
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}