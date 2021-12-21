import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Exception } from '../../../../gas-ps-library/src/exceptions/exception'

@Injectable()
export class JwtBearerGuard extends AuthGuard('jwt-bearer') {
  handleRequest(err, user, info) {
    if (err || !user) {
      Exception.Unauthorized(err)
    }
    return user
  }
}