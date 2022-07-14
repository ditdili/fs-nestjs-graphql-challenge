import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

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
