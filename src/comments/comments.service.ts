import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Comment } from './entities';
import { AddCommentInput, UpdateCommentInput } from './inputs';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  async find(postId: number) {
    return await this.commentsRepository.find({
      where: {
        post: {
          id: postId,
        },
      },
    });
  }

  async add(input: AddCommentInput, userId: number) {
    const { postId, text, parentCommentId } = input;

    const owner = await this.usersService.findById(userId);
    const post = await this.postsService.findById(input.postId);

    const comment = this.commentsRepository.create({
      parent_comment: parentCommentId ? { id: parentCommentId } : undefined,
      text,
      owner,
      post,
    });

    await this.commentsRepository.save(comment);
  }

  async update(input: UpdateCommentInput, userId: number) {
    const candidate = await this.commentsRepository.findOne({
      where: {
        id: input.commentId,
        owner: {
          id: userId,
        },
      },
    });

    if (!candidate) {
      throw new GraphQLError('You do not have permission', {
        extensions: {
          exception: {
            code: '404',
          },
        },
      });
    }

    return await this.commentsRepository.update(
      { id: input.commentId },
      { text: input.text, is_updated: true },
    );
  }

  async delete(commentId: number, userId: number) {
    const candidate = await this.commentsRepository.findOne({
      where: {
        id: commentId,
        owner: {
          id: userId,
        },
      },
    });

    if (!candidate) {
      throw new GraphQLError('You do not have permission', {
        extensions: {
          exception: {
            code: '404',
          },
        },
      });
    }

    return await this.commentsRepository.update(
      { id: commentId },
      { is_deleted: true },
    );
  }
}
