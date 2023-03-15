import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
//@ts-ignore
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class UpdateUserInput {
  @IsString()
  @MaxLength(255)
  @IsOptional()
  @Field(() => String, { nullable: true })
  description: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  show_posts: boolean;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  show_communities: boolean;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => GraphQLUpload, { name: 'photo', nullable: true })
  photo?: FileUpload;
}
