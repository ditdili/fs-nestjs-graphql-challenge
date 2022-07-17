import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import {
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { IsbnExistsRule } from '../utils/customUniqueIsbn';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  isbn: string;

  @Field({ nullable: true })
  category?: string;

  @Field(() => Int)
  inventory: number;

  @Field({ nullable: true })
  notes?: string;
}

@InputType()
export class BookInput {
  @IsNumberString()
  @Field(() => ID)
  id: string;

  @IsString()
  @Length(0, 255)
  @Field()
  title: string;

  @IsString()
  @Length(0, 255)
  @Field()
  author: string;

  @Length(13, 13, {
    message: 'isbn must be 13 characters long',
  })
  @IsNumberString()
  @Validate(IsbnExistsRule)
  @Field()
  isbn: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  @Field({ nullable: true })
  category?: string;

  @IsInt()
  @Field(() => Int)
  inventory: number;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  @Field({ nullable: true })
  notes?: string;
}

@InputType()
export class BookInputUpdate extends PartialType(
  OmitType(BookInput, ['id', 'isbn'])
) {
  @IsNumberString()
  @Field(() => ID)
  id: string;

  @Length(13, 13, {
    message: 'isbn must be 13 characters long',
  })
  @IsNumberString()
  @Validate(IsbnExistsRule)
  @Field()
  isbn: string;
}
