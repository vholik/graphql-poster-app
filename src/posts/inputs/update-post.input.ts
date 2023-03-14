import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  photo?: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean)
  is_active?: boolean;
}
