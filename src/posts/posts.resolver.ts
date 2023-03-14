import { Post, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from 'src/auth';
import { CreatePostInput } from './inputs';
import { UpdatePostInput } from './inputs';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => String)
  getPosts() {
    return 'hello';
  }

  @Mutation(() => String)
  @UseGuards(AuthenticatedGuard)
  createPost(@Args('data') input: CreatePostInput, @Context() ctx: any) {
    const userId = ctx.req.user.userId;

    return this.postsService.create(input, userId);
  }

  @Mutation((returns) => String)
  @UseGuards(AuthenticatedGuard)
  updatePost(@Args('data') input: UpdatePostInput, @Context() ctx: any) {
    const userId = ctx.req.user.userId;

    return this.postsService.update(input, userId);
  }
}
