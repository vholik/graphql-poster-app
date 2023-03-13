import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, LoginUserInput } from './dto';
import { Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth';

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

  @UseGuards(LocalAuthGuard)
  @Mutation((returns) => User, { nullable: true })
  login(@Args('data') dto: LoginUserInput, @Context() context: any) {
    return this.usersService.getUser(dto.email);
  }

  @Query(() => [User])
  getAll() {
    return this.usersService.getAll();
  }

  @Query(() => String)
  @UseGuards(AuthenticatedGuard)
  protected() {
    return 'This route is protected';
  }

  @Mutation((returns) => String)
  @UseGuards(LocalAuthGuard)
  logout(@Request() req: any) {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
