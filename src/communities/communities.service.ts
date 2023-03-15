import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { UploadService } from 'src/upload/upload.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Community } from './entities';
import { CreateCommunityInput } from './inputs';
import { UpdateCommunityInput } from './inputs/update-community.input';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communitiesRepository: Repository<Community>,
    private uploadService: UploadService,
    private usersService: UsersService,
  ) {}

  async create(input: CreateCommunityInput, userId: number) {
    const user = await this.usersService.findById(userId);

    const community = this.communitiesRepository.create({
      ...input,
      photo: input.photo
        ? await this.uploadService.handleUpload(input.photo)
        : undefined,
      cover: input.cover
        ? await this.uploadService.handleUpload(input.cover)
        : undefined,
      owner: user,
    });

    return await this.communitiesRepository.save(community);
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

    return await this.communitiesRepository.update(
      { id: communityId },
      {
        ...rest,
        photo: input.photo
          ? await this.uploadService.handleUpload(input.photo)
          : undefined,
        cover: input.cover
          ? await this.uploadService.handleUpload(input.cover)
          : undefined,
      },
    );
  }
}
