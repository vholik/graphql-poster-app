import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesResolver } from './communities.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entities';
import { UploadModule } from 'src/upload';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [CommunitiesService, CommunitiesResolver],
  imports: [TypeOrmModule.forFeature([Community]), UploadModule, UsersModule],
})
export class CommunitiesModule {}
