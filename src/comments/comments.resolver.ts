import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from 'src/auth';
import { CommentsModule } from './comments.module';
import { CommentsService } from './comments.service';
import { Comment } from './entities';
import { Query } from '@nestjs/graphql';
import { AddCommentInput, UpdateCommentInput } from './inputs';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  @UseGuards(AuthenticatedGuard)
  addComment(@Args('data') input: AddCommentInput, @Context() ctx: any) {
    const userId = ctx.req.user.userId;

    return this.commentsService.add(input, userId);
  }

  @Mutation(() => Comment)
  @UseGuards(AuthenticatedGuard)
  updateComment(@Args('data') input: UpdateCommentInput, @Context() ctx: any) {
    const userId = ctx.req.user.userId;

    return this.commentsService.update(input, userId);
  }
  @Mutation(() => Comment)
  @UseGuards(AuthenticatedGuard)
  deleteComment(@Args('commentId') commentId: number, @Context() ctx: any) {
    const userId = ctx.req.user.userId;

    return this.commentsService.delete(commentId, userId);
  }

  @Query(() => [Comment])
  findComments(postId: number) {
    return this.commentsService.find(postId);
  }
}
