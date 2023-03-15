import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from 'src/comments';
import { Community } from 'src/communities';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
  @Field((type) => User)
  owner: User;

  @ManyToOne(() => Community, (community) => community.posts)
  @Field((type) => Community)
  community: Community;

  @CreateDateColumn()
  @Field((type) => Date)
  date: Date;

  @CreateDateColumn()
  @Field((type) => Date)
  last_update: Date;

  @Field((type) => String)
  @Column({ nullable: true })
  photo: string;

  @Field((type) => Int)
  @Column({ default: 0 })
  views: number;

  @OneToMany(() => User, (user) => user.saved_posts)
  @Field((type) => [User])
  likes: User[];

  @Field((type) => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field((type) => String)
  @Column('text')
  text: string;

  @Field((type) => String)
  @Column()
  title: string;

  @Field((type) => String)
  @Column({ nullable: true })
  link: string;

  @Field((type) => Boolean)
  @Column({ default: true })
  is_active: boolean;

  // @Field((type) => [String])
  // @Column('string', { array: true })
  // tags: string[];
}
