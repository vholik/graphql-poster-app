import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Rule } from 'src/rules';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class UpdateCommunityInput {
  @IsNumber()
  @Field(() => String)
  communityId: number;

  @IsString()
  @Field(() => String, { nullable: true })
  @IsOptional()
  cover?: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  photo?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  // @IsOptional()
  // @Field(() => [Rule], { nullable: true })
  // rules?: Rule[];

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: string;
}
