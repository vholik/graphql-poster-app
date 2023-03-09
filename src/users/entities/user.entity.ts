import { ObjectType, Field, Int, Boo } from '@nestjs/graphql';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  @OneToMany((type) => Community, (community) => community.users)
  @Field((type) => [Community])
  subscribed_communities: Community[];

  @Field((type) => Boolean)
  @Column()
  show_posts: boolean;

  @Field((type) => Boolean)
  @Column()
  show_communities: boolean;

  @Field((type) => [Posts])
  @OneToMany((type) => Post, (post) => post.owner)
  saved_posts: Posts[];

  @Field((type) => [Community])
  @OneToMany((type) => Community, (community) => community.users)
  communities_owner: Community[];

  @Field((type) => [Community])
  @OneToMany((type) => Community, (community) => community.users)
  communities_moderator: Community[];
}
