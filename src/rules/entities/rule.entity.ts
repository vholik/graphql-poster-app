import { Field, ObjectType } from '@nestjs/graphql';
import { Community } from 'src/communities';
import { Column, ManyToOne } from 'typeorm';

@ObjectType()
export class Rule {
  id: number;

  @Field((type) => String)
  @Column()
  text: string;

  @Field((type) => Community)
  @ManyToOne(() => Community, (community) => community.rules)
  community: Community;
}
