import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts';
import { User } from 'src/users/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.comments)
  owner: User;

  @Field((type) => String)
  text: string;

  @CreateDateColumn()
  @Field((type) => Date)
  date: Date;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.comment_upvotes)
  vote_users_upvote: User[];

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.comment_downvotes)
  vote_users_downvote: User[];

  @ManyToOne((type) => Comment, (comment) => comment.childComment)
  parentComment: Comment;

  @OneToMany((type) => Comment, (comment) => comment.parentComment)
  childComment: Comment;

  @Field((type) => [Comment])
  @OneToMany(() => Post, (post) => post.comments)
  post: Post;

  @Field(() => Boolean, { defaultValue: false })
  @Column('bool', { default: false })
  isDeleted: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @Column('bool', { default: false })
  isUpdated: boolean;
}
