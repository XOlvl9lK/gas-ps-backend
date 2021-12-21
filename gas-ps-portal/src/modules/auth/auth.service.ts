import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../entities/User'
import { Repository } from 'typeorm'
import { AuthDto } from './auth.dto'
import { Exception } from '../../../../gas-ps-library/src/exceptions/exception'
import { AsyncTryCatch } from '../../common/decorators/asyncTryCatch.decorator'
import { JwtService } from '@nestjs/jwt'
import { RefreshToken } from '../../entities/RefreshToken'
import { compareSync, hashSync } from 'bcrypt'
import { UserDto } from '../user/user.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService
  ) {
  }

  @AsyncTryCatch(AuthService.name)
  async register(authDto: AuthDto) {
    let user = await this.userRepository.findOne({
      where: { login: authDto.login }
    })
    if (!user) {
      const hashedPassword = hashSync(authDto.password, +process.env.BCRYPT_ROUNDS || 5)
      user = await this.userRepository.create({
        login: authDto.login,
        password: hashedPassword
      })
      await this.userRepository.save(user)
      const { access_token, refresh_token } = await this.generateTokens(user)
      return { access_token, refresh_token, user: new UserDto(user) }
    }
    Exception.BadRequest(null, 'Пользователь с таким логином уже существует')
  }

  @AsyncTryCatch(AuthService.name)
  async login(authDto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: { login: authDto.login }
    })
    if (user) {
      if (compareSync(authDto.password, user.password)) {
        const { access_token, refresh_token } = await this.generateTokens(user)
        return { access_token, refresh_token, userDto: new UserDto(user) }
      }
      Exception.BadRequest(null, 'Неверный пароль')
    }
    Exception.BadRequest(null, 'Пользователь не найден')
  }

  @AsyncTryCatch(AuthService.name)
  async refresh(refresh_token: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({ where: { token: refresh_token }})
    if (!refreshToken) {
      Exception.Unauthorized(null)
    }
    const payload = { sub: refreshToken.user }
    return this.jwtService.sign(
      payload,
      { secret: process.env.ACCESS_SECRET || 'accessSecret', expiresIn: '15m' }
    )
  }

  @AsyncTryCatch(AuthService.name)
  async generateTokens(user: User) {
    const payload = { sub: user.id }
    const refresh_token = this.jwtService.sign(
      payload,
      {
        secret: process.env.REFRESH_SECRET || 'refreshSecret',
        expiresIn: '24h'
      }
    )
    const access_token = this.jwtService.sign(
      payload,
      { secret: process.env.ACCESS_SECRET || 'accessSecret', expiresIn: '15m' }
    )

    await this.saveRefreshToken(user, refresh_token)

    return { access_token, refresh_token }
  }

  @AsyncTryCatch(AuthService.name)
  async saveRefreshToken(user: User, refresh_token: string) {
    let refreshToken = await this.refreshTokenRepository.findOne({
      where: {
        user: {
          id: user.id
        }
      }
    })
    if (refreshToken) {
      refreshToken.token = refresh_token;
      await this.refreshTokenRepository.save(refreshToken)
    } else {
      refreshToken = await this.refreshTokenRepository.create({
        token: refresh_token,
        user: user
      })
      await this.refreshTokenRepository.save(refreshToken)
    }
  }
}
