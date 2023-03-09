import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts';
import { User } from 'src/users/entities';
import {
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.posts)
  owner: User;

  @CreateDateColumn()
  @Field((type) => Date)
  date: Date;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.comment_upvotes)
  vote_users_upvote: User[];

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.comment_downvotes)
  vote_users_downvote: User[];

  @ManyToMany((type) => Comment)
  @JoinTable()
  @Field((type) => [Comment])
  subcomments: Comment;

  @Field((type) => [Comment])
  @OneToMany(() => Post, (post) => post.comments)
  post: Post;
}
