import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new GraphQLError('There is no user with that id', {
        extensions: {
          exception: {
            code: '404',
          },
        },
      });
    }
    if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username,
      };
    }
    return null;
  }
}
