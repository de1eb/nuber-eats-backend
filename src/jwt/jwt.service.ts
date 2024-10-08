import { Inject, Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { CONFIG_OPTIONS } from '../common/common.constans';
import { JwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) { }
  sign(userId: number): string {
    return jwt.sign({ id: userId, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, this.options.privateKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
