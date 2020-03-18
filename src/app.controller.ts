import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/auth.jwt.guard';
import { LocalAuthGuard } from './auth/auth.local.quard';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('auth/signup')
  async signUpUser(
    @Body('username') userName: string,
    @Body('password') password: string,
  ) {
    try {
      const res = await this.userService.addUser(userName, password);
      console.log(res);
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
