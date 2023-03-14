import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities';
import { AddCommentInput, UpdateCommentInput } from './inputs';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

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

    return await this.commentsRepository.update(
      { id: input.commentId },
      { text: input.text, isUpdated: true },
    );
  }
}
