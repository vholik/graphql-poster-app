import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class UpdateCommentInput {
  @Field((type) => String)
  @IsString()
  @MaxLength(255)
  text: string;

  @Field((type) => Number)
  @IsNumber()
  @IsNotEmpty()
  commentId: number;
}
