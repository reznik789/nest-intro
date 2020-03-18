import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(userName);
    if (!user) return null;
    const isValidPass = await user.comparePassword(pass);
    if (!isValidPass) return null;
    const { username, _id } = user;
    return { username, id: _id };
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
