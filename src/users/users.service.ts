import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { GraphQLError } from 'graphql';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signup(dto: CreateUserInput) {
    const { email, password, username } = dto;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    // Check user by username
    const candidate = await this.usersRepository.findBy({
      username,
    });

    if (candidate) {
      throw new GraphQLError('User with that username already exists', {
        extensions: {
          exception: {
            code: '404',
          },
        },
      });
    }

    const user = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    console.log(user);

    return user;
    // return user;
  }

  async getAll() {
    return await this.usersRepository.find();
  }
}
