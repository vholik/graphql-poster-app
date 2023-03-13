import { InputType, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class UpdateUserInput {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  show_posts: boolean;

  @IsBoolean()
  @IsOptional()
  show_communities: boolean;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  name: string;
}
