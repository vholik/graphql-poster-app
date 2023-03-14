import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { CreateUserInput } from 'src/users/dto';
import { Repository } from 'typeorm';
import { Post } from '.';
import { CreatePostInput } from './inputs/create-post.input';
import { UpdatePostInput } from './inputs/update-post.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(input: CreatePostInput, userId: number) {
    const post = this.postsRepository.create({
      ...input,
      owner: { id: userId },
      community: { id: input.community_id },
    });
    return await this.postsRepository.save(post);
  }

  async update(input: UpdatePostInput, userId: number) {
    const { id, ...restInput } = input;

    //Check if posts belongs to user
    const post = await this.postsRepository.findOne({
      where: {
        id,
        owner: {
          id: userId,
        },
      },
    });
    if (!post) {
      throw new GraphQLError('There is no user with that id', {
        extensions: {
          exception: {
            code: '403',
          },
        },
      });
    }

    return await this.postsRepository.update(
      { id },
      { ...restInput, last_update: Date.now() },
    );
  }
}
