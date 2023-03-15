import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
//@ts-ignore
import { FileUpload, GraphQLUpload } from 'graphql-upload';

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

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  community_id: number;

  @Field(() => GraphQLUpload, { name: 'photo', nullable: true })
  photo?: FileUpload;
}
