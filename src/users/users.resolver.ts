import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((returns) => User)
  async signup(@Args('data') dto: CreateUserInput) {
    return await this.usersService.signup(dto);
  }

  @Query(() => [User])
  async getAll() {
    return await this.usersService.getAll();
  }
}
