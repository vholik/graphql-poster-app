import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Post } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from 'src/upload';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PostsService, PostsResolver],
  imports: [TypeOrmModule.forFeature([Post]), UploadModule, UsersModule],
  exports: [PostsService],
})
export class PostsModule {}
