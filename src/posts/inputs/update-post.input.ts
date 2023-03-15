import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
//@ts-ignore
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class UpdatePostInput {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @IsString()
  @IsOptional()
  text?: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  link?: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean)
  is_active?: boolean;

  @Field(() => GraphQLUpload, { name: 'file', nullable: true })
  photo?: FileUpload;
}
