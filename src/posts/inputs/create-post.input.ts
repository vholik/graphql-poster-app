import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class CreatePostInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  link?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  photo?: string;

  @IsNumber()
  @IsNotEmpty()
  community_id: number;
}
