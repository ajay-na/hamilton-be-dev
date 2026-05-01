import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  AndroidGoogleLoginDto,
  LoginResponseDto,
} from './dto/login-response.dto';
import { GoogleUser } from './strategies/google.strategy';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Initiate Google OAuth2 Login',
    description: 'Redirects the user to the Google Account selection screen.',
  })
  @ApiResponse({ status: 302, description: 'Redirect to Google' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() _req: unknown): Promise<void> {}

  @ApiOperation({
    summary: 'Google OAuth2 Callback',
    description:
      'The endpoint Google redirects to after successful authentication. Returns the JWT access token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated',
    type: LoginResponseDto,
  })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: { user: GoogleUser },
  ): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('google/android')
  @ApiOperation({
    summary: 'Verify Android Native Google Login',
    description:
      'Receives the Google id_token from the native Android app, verifies it with Google, and returns a backend JWT access token for the user session.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated. Returns the backend JWT.',
    type: AndroidGoogleLoginDto,
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. The Google id_token is invalid, expired, or missing.',
  })
  async googleAndroidLogin(@Body('id_token') idToken: string) {
    return this.authService.verifyAndroidGoogleLogin(idToken);
  }

  @Post('google/app')
  @ApiOperation({
    summary: 'Verify Android Native Google Login',
    description:
      'Receives the Google id_token from the native Android app, verifies it with Google, and returns a backend JWT access token for the user session.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated. Returns the backend JWT.',
    type: AndroidGoogleLoginDto,
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. The Google id_token is invalid, expired, or missing.',
  })
  async googleMobLogin(@Body('id_token') idToken: string) {
    return this.authService.verifyMobileGoogleLogin(idToken);
  }
}
