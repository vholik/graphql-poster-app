import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { Community } from './entities';
import { CreateCommunityInput } from './inputs';
import { UpdateCommunityInput } from './inputs/update-community.input';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communitiesRepository: Repository<Community>,
  ) {}

  async create(input: CreateCommunityInput, userId: number) {
    const community = this.communitiesRepository.create({
      ...input,
      owner: { id: userId },
    });

    await this.communitiesRepository.save(community);
  }

  async update(input: UpdateCommunityInput, userId: number) {
    //Check if community belongs to user

    const { communityId, ...rest } = input;

    const community = await this.communitiesRepository.findOne({
      where: { id: communityId, owner: { id: userId } },
    });

    if (!community) {
      throw new GraphQLError('There is no user with that id', {
        extensions: {
          exception: {
            code: '403',
          },
        },
      });
    }

    return await this.communitiesRepository.update({ id: communityId }, rest);
  }
}
