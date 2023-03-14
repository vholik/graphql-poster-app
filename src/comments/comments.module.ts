import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { Comment } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CommentsService, CommentsResolver],
  imports: [TypeOrmModule.forFeature([Comment])],
})
export class CommentsModule {}
