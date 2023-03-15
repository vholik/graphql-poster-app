import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesResolver } from './communities.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entities';
import { UploadModule } from 'src/upload';

@Module({
  providers: [CommunitiesService, CommunitiesResolver],
  imports: [TypeOrmModule.forFeature([Community]), UploadModule],
})
export class CommunitiesModule {}
