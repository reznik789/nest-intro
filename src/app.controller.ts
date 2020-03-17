import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

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

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
