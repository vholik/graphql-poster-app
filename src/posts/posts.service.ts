import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    await this.postsRepository.save(post);
  }

  async update(input: UpdatePostInput) {
    const { id, ...restInput } = input;
    await this.postsRepository.update(
      { id },
      { ...restInput, last_update: Date.now() },
    );
  }
}
