import { Field, ObjectType } from '@nestjs/graphql';
import { Community } from 'src/communities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column()
  text: string;

  @Field((type) => Community)
  @ManyToOne(() => Community, (community) => community.rules)
  community: Community;
}
