import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, Max, MaxLength, MinLength } from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class LoginUserInput {
  @Field()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(20)
  @Field()
  @MinLength(8)
  password: string;
}
