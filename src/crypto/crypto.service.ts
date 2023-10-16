import { Injectable } from '@nestjs/common';
import { pbkdf2Sync } from 'crypto';

@Injectable()
export class CryptoService {

  hashPassword(password) {
    const derivedKey = pbkdf2Sync(password, "salt", 10000, 64, 'sha512');
    return derivedKey.toString('hex');
  }

}
