import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
//@ts-ignore
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class CreateCommunityInput {
  @Field(() => GraphQLUpload, { name: 'cover', nullable: true })
  cover?: FileUpload;

  @Field(() => GraphQLUpload, { name: 'photo', nullable: true })
  photo?: FileUpload;

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
  @Field(() => [String], { nullable: true })
  rules?: string[];
}
