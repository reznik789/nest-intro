import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userName: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(userName);
    if (!user) return null;
    const isValidPass = await user.comparePassword(pass);
    if (!isValidPass) return null;
    const { username, _id } = user;
    return { username, id: _id };
  }
}
