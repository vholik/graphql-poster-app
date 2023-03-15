import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Post } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from 'src/upload';

@Module({
  providers: [PostsService, PostsResolver],
  imports: [TypeOrmModule.forFeature([Post]), UploadModule],
})
export class PostsModule {}
