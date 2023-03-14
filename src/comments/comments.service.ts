import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { Comment } from './entities';
import { AddCommentInput, UpdateCommentInput } from './inputs';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
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

    return await this.commentsRepository.update(
      {
        id: postId,
      },
      {
        parentComment: parentCommentId ? { id: parentCommentId } : undefined,
        text,
        owner: {
          id: userId,
        },
      },
    );
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
      { text: input.text, isUpdated: true },
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
      { isDeleted: true },
    );
  }
}
