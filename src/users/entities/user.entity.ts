import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from 'src/posts';
import { Community } from 'src/communities';
import { Comment } from 'src/comments';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => String)
  id: string;

  @Column({ unique: true })
  @Field({ nullable: false })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
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

  @OneToMany(() => Post, (post) => post.owner)
  @Field((type) => [Post])
  posts: Post[];

  @ManyToMany(() => Community)
  @Field((type) => [Community])
  subscribed_communities: Community[];

  @Field((type) => Boolean)
  @Column({ default: true })
  show_posts: boolean;

  @Field((type) => Boolean)
  @Column({ default: true })
  show_communities: boolean;

  @OneToMany((type) => Comment, (comment) => comment.owner)
  @Field((type) => [Comment])
  comments: Comment[];

  @ManyToMany(() => Post)
  @JoinTable()
  @Field((type) => [Post])
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
