import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { IsbnExistsRule } from '../utils/custom-unique-isbn';
import { IdExistsRuleOnUpdate } from '../utils/custom-unique-id';

@Module({
  imports: [],
  providers: [
    BooksService,
    BooksResolver,
    IdExistsRuleOnUpdate,
    IsbnExistsRule,
  ],
})
export class BooksModule {}
