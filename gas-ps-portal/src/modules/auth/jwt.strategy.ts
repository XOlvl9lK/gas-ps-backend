import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('Cookie'),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET || 'secret'
    })
  }

  async validate(payload: any) {
    return { userId: payload.sub }
  }
}