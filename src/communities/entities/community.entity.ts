import {
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users';
import { Post } from 'src/posts';
import { Field, ObjectType } from '@nestjs/graphql';
import { Rule } from 'src/rules';

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
  @ManyToMany(() => Post)
  @JoinTable()
  posts: Post[];

  @Field((type) => [Rule])
  @OneToMany((type) => Rule, (rule) => rule.community)
  rules: Rule[];
}
