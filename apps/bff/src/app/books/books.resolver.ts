import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book, BookInput, BookInputUpdate } from './book.model';
import { BooksService } from './books.service';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query(() => Book)
  async getBook(@Args('id', { type: () => ID }) id: string) {
    return this.booksService.findById(id);
  }

  @Query(() => [Book])
  async getBooks() {
    return this.booksService.find();
  }

  @Mutation(() => [Book])
  async addBook(@Args('book') book: BookInput) {
    return this.booksService.create(book);
  }

  @Mutation(() => Book)
  async updateBook(@Args('book') book: BookInputUpdate) {
    return this.booksService.update(book);
  }
}
