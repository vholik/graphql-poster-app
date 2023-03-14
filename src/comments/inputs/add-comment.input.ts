import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class AddCommentInput {
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(255)
  text: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  parentCommentId?: number;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
