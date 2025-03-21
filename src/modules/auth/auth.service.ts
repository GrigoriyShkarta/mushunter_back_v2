// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
//
// interface TokenPayload {
//   sub: string;
// }
//
// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService,
//   ) {}
//
//   generateTokens(userId: string): {
//     accessToken: string;
//     refreshToken: string;
//   } {
//     if (!userId) {
//       throw new UnauthorizedException('User ID is required');
//     }
//
//     const payload: TokenPayload = { sub: userId };
//
//     const accessToken = this.jwtService.sign(payload, {
//       secret: this.configService.get<string>(process.env.JWT_SECRET as string),
//       expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '24h'),
//     });
//
//     const refreshToken = this.jwtService.sign(payload, {
//       secret: this.configService.get<string>(
//         process.env.REFRESH_SECRET as string,
//       ),
//       expiresIn: this.configService.get<string>('REFRESH_EXPIRES_IN', '7d'),
//     });
//
//     return { accessToken, refreshToken };
//   }
//
//   verifyRefreshToken(token: string): TokenPayload {
//     if (!token) {
//       throw new UnauthorizedException('Refresh token is required');
//     }
//
//     try {
//       const payload = this.jwtService.verify<TokenPayload>(token, {
//         secret: this.configService.get<string>(
//           process.env.REFRESH_SECRET as string,
//         ),
//       });
//
//       if (!payload.sub) {
//         throw new UnauthorizedException(
//           'Invalid refresh token: missing user ID',
//         );
//       }
//
//       return payload;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid or expired refresh token');
//     }
//   }
//
//   verifyAccessToken(token: string): TokenPayload {
//     if (!token) {
//       throw new UnauthorizedException('Access token is required');
//     }
//
//     try {
//       const payload = this.jwtService.verify<TokenPayload>(token, {
//         secret: this.configService.get<string>(
//           process.env.JWT_SECRET as string,
//         ),
//       });
//
//       if (!payload.sub) {
//         throw new UnauthorizedException(
//           'Invalid access token: missing user ID',
//         );
//       }
//
//       return payload;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid or expired access token');
//     }
//   }
// }

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  async refreshAccessToken(refreshToken: string) {
    try {
      const firebaseApiKey = this.configService.get<string>('FIREBASE_API_KEY'); // Загружаем API_KEY из env
      const url = `https://securetoken.googleapis.com/v1/token?key=${firebaseApiKey}`;

      const response = await axios.post(url, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });

      return {
        accessToken: response.data.id_token, // Новый токен
        refreshToken: response.data.refresh_token, // Обновленный refreshToken
        expiresIn: response.data.expires_in, // Время жизни в секундах
      };
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error.response?.data);
      throw new HttpException(
        'Не удалось обновить токен',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
