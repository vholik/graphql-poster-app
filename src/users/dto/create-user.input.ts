import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, Max, MaxLength, MinLength } from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(255)
  @Field(() => String)
  username: string;

  @IsString()
  @MaxLength(20)
  @Field(() => String)
  @MinLength(8)
  password: string;
}
