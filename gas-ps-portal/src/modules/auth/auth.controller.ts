import { Body, Controller, Post, Res, UseGuards, Headers } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'
import { Response } from 'express'
import { JwtBearerGuard } from './jwt-bearer.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { access_token, refresh_token, userDto } = await this.authService.login(authDto)
    res.cookie('access_token', access_token, { httpOnly: true })
    res.json({ refresh_token, userDto })
  }


  @Post('login')
  async loginUser(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { access_token, refresh_token, userDto } = await this.authService.login(authDto)
    res.cookie('access_token', access_token, { httpOnly: true })
    res.json({ refresh_token, userDto })
  }

  @UseGuards(JwtBearerGuard)
  @Post('refresh')
  async refresh(@Headers('Authorization') authorization: string, @Res({ passthrough: true }) res: Response) {
    const access_token = this.authService.refresh(authorization.split(' ')[1])
    res.cookie('access_token', access_token, { httpOnly: true })
    res.end()
  }
}
