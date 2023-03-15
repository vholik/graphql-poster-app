import {
  Column,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => User, (user) => user.communities_owner, { cascade: true })
  @Field((type) => User)
  @JoinColumn({ name: 'userId' })
  owner: User;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  cover?: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  photo?: string;

  @Column('text')
  @Field((type) => String)
  description: string;

  @Field((type) => [Post])
  @OneToMany(() => Post, (post) => post.community, { cascade: true })
  posts: Post[];

  @Column({ unique: true })
  @Field((type) => String)
  pid: string;

  @Column('text', { array: true, nullable: true })
  @Field(() => [String])
  rules: string[];
}
