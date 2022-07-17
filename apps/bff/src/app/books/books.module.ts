import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { IsbnExistsRule } from '../utils/customUniqueIsbn';

@Module({
  imports: [],
  providers: [BooksService, BooksResolver, IsbnExistsRule],
})
export class BooksModule {}
