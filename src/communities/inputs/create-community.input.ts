import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class CreateCommunityInput {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  cover?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  photo?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: true })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  pid: string;

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String])
  rules?: string[];
}
