import { Injectable } from '@nestjs/common';
import { books } from '../../data/books';
import { NotFoundError } from '../../errors/not-found.error';
import { Book } from './book.interface';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];

  constructor() {
    // Load initial data set
    this.books = books;
  }

  public findById(id: string): Book {
    const book = this.books.find((b) => b.id === id);

    if (!book) {
      throw new NotFoundError(`Book with id "${id}" not found.`);
    }

    return book;
  }

  public find(): Book[] {
    return this.books;
  }

  public create(book: Book): Book[] {
    this.books.push(book);

    return this.books;
  }
}
