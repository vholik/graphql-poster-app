import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts';
import { User } from 'src/users/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ type: 'int', nullable: true })
  upvote_user_id: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.comment_upvotes)
  vote_users_upvote: User[];

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.comment_downvotes)
  vote_users_downvote: User[];

  @ManyToOne((type) => Comment, (comment) => comment.child_comment)
  parent_comment: Comment;

  @OneToMany((type) => Comment, (comment) => comment.parent_comment)
  child_comment: Comment;

  @Field((type) => [Comment])
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Field(() => Boolean, { defaultValue: false })
  @Column('bool', { default: false })
  is_deleted: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @Column('bool', { default: false })
  is_updated: boolean;
}
