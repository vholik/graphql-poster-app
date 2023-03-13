import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Post } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PostsService, PostsResolver],
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
