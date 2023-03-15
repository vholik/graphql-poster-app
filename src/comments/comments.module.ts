import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { Comment } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  providers: [CommentsService, CommentsResolver],
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, PostsModule],
})
export class CommentsModule {}
