import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users';
import { Post } from 'src/posts';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Community {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.communities_owner)
  @Field((type) => User)
  owner: User;

  @Column()
  @Field((type) => String)
  cover: string;

  @Field((type) => String)
  @Column()
  photo: string;

  @Column('text')
  @Field((type) => String)
  description: string;

  @Field((type) => [Post])
  @OneToMany(() => Post, (post) => post.community)
  posts: Post[];

  @Column({ unique: true })
  @Field((type) => String)
  pid: string;

  @Column('text', { array: true })
  @Field(() => [String])
  rules: string[];
}
