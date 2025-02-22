import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    console.log('body', body);
    const decoded = await this.authService.verifyRefreshToken(
      body.refreshToken,
    );
    if (!decoded) {
      throw new Error('Invalid refresh token');
    }
    return this.authService.generateTokens(decoded.sub);
  }
}
