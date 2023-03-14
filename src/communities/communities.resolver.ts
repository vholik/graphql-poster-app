import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from 'src/auth';
import { CommunitiesService } from './communities.service';
import { Community } from './entities';
import { CreateCommunityInput } from './inputs';
import { UpdateCommunityInput } from './inputs';

@Resolver()
export class CommunitiesResolver {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Mutation((returns) => Community)
  @UseGuards(AuthenticatedGuard)
  createCommunity(
    @Args('data') input: CreateCommunityInput,
    @Context() ctx: any,
  ) {
    const user = ctx.req.user;
    console.log(user);

    return this.communitiesService.create(input, user.id);
  }

  @Mutation((returns) => Community)
  @UseGuards(AuthenticatedGuard)
  updateCommunity(
    @Args('data') input: UpdateCommunityInput,
    @Context() ctx: any,
  ) {
    const user = ctx.req.user;
    console.log(user);

    return this.communitiesService.update(input, user.id);
  }
}
