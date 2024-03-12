import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { CurrentUser } from '../decorators/getCurrentUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //get user profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getMe(@CurrentUser() user: any) {
    return user;
  }
}
