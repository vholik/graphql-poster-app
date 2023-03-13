import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesResolver } from './communities.resolver';

@Module({
  providers: [CommunitiesService, CommunitiesResolver]
})
export class CommunitiesModule {}
