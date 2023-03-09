import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
  @Field((type) => User)
  owner: User;

  @CreateDateColumn()
  @Field((type) => Date)
  date: Date;

  @Field((type) => String)
  @Column({ nullable: true })
  photo: string;

  @Field((type) => Int)
  @Column()
  views: number;

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];

  // @Field((type) => [Comment])
  // @OneToMany(() => Comment, (comment) => user.likes)
  // comments: Comment[];

  @Field((type) => String)
  @Column('text')
  text: string;

  @Field((type) => String)
  @Column()
  link: string;

  @Field((type) => Boolean)
  @Column()
  is_active: boolean;

  @Field((type) => [String])
  @Column('string', { array: true })
  tags: string[];
}
