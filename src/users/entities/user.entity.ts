import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from 'src/posts';
import { Community } from 'src/communities';
import { Comment } from 'src/comments';

@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @Column()
  @Field({ nullable: false })
  username: string;

  @Column()
  @Field({ nullable: false })
  email: string;

  @Column({ nullable: true })
  @Field({
    nullable: true,
    defaultValue:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  })
  photo: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @OneToMany((type) => Post, (post) => post.owner)
  @Field((type) => [Post])
  posts: Post[];

  @ManyToMany(() => Community)
  @JoinTable()
  @Field((type) => [Community])
  subscribed_communities: Community[];

  @Field((type) => Boolean)
  @Column()
  show_posts: boolean;

  @Field((type) => Boolean)
  @Column()
  show_communities: boolean;

  @OneToMany((type) => Comment, (comment) => comment.owner)
  @Field((type) => [Comment])
  comments: Comment[];

  @Field((type) => [Post])
  @OneToMany((type) => Post, (post) => post.owner)
  saved_posts: Post[];

  @Field((type) => [Community])
  @OneToMany((type) => Community, (community) => community.owner)
  communities_owner: Community[];

  @Field((type) => [Comment])
  @OneToMany((type) => Comment, (comment) => comment.vote_users_downvote)
  comment_downvotes: Comment[];

  @Field((type) => [Comment])
  @OneToMany((type) => Comment, (comment) => comment.vote_users_upvote)
  comment_upvotes: Comment[];
}
