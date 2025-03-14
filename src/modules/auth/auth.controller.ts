import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  refresh(@Body() body: RefreshTokenDto) {
    const { refreshToken } = body;

    try {
      const decoded = this.authService.verifyRefreshToken(refreshToken);

      const tokens = this.authService.generateTokens(decoded.sub);

      this.logger.log(`Tokens refreshed for user ID: ${decoded.sub}`);
      return tokens;
    } catch (error) {
      this.logger.error(`Failed to refresh tokens: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
