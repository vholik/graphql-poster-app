import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { GraphQLError } from 'graphql';
import { LoginUserInput } from './dto';
import { UpdateUserInput } from './dto/update-user.input';

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
    const candidate = await this.usersRepository.findOne({
      where: {
        username,
      },
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

    return user;
  }

  async getUser(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new GraphQLError('There is no user with that id', {
        extensions: {
          exception: {
            code: '404',
          },
        },
      });
    }

    return user;
  }

  async getAll() {
    return await this.usersRepository.find();
  }

  async update(input: UpdateUserInput) {
    const { id, ...restInput } = input;

    return await this.usersRepository.update(
      {
        id,
      },
      {
        ...restInput,
      },
    );
  }
}
