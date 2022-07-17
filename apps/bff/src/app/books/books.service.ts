import { Injectable } from '@nestjs/common';
import { books } from '../../data/books';
import { NotFoundError } from '../../errors/not-found.error';
import { Book } from './book.interface';
import { BookInput, BookInputUpdate } from './book.model';

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

  public create(book: BookInput): Book[] {
    this.books.push(book);

    return this.books;
  }

  private findByIndex(id: string): number {
    const index = this.books.findIndex((b) => b.id === id);

    if (index === -1) {
      throw new NotFoundError(`Book with id "${id}" not found.`);
    }

    return index;
  }

  public update(book: BookInputUpdate): Book {
    const bookToUpdate = { ...this.findById(book.id), ...book };
    const bookIndex = this.findByIndex(book.id);

    this.books[bookIndex] = bookToUpdate;

    return bookToUpdate;
  }

  public findByIsbn(isbn: string): Book {
    const found = this.books.find((b) => b.isbn === isbn);

    return found;
  }
}
