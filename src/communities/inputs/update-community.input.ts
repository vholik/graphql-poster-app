import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
//@ts-ignore
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class UpdateCommunityInput {
  @IsNumber()
  @Field(() => String)
  communityId: number;

  @Field(() => GraphQLUpload, { name: 'file', nullable: true })
  cover?: FileUpload;

  @Field(() => GraphQLUpload, { name: 'file', nullable: true })
  photo?: FileUpload;

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
