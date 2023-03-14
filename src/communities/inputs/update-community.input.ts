import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String])
  rules?: string[];
}
