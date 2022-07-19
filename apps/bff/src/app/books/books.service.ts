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

  public findByIdNoError(id: string): Book {
    const book = this.books.find((b) => b.id === id);

    return book;
  }

  public find(search?: string): Book[] {
    if (search.length) {
      const searchLowercase = search.toLowerCase();

      return this.books.filter(
        (b) =>
          b.title.toLowerCase().includes(searchLowercase) ||
          b.author.toLowerCase().includes(searchLowercase) ||
          b.category.toLowerCase().includes(searchLowercase)
      );
    }

    return this.books;
  }

  public create(book: BookInput): Book[] {
    const bookExists = this.findByIdNoError(book.id);

    if (bookExists) {
      throw new Error(`Book with id "${book.id}" exists.`);
    }

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
    const bookToUpdate = {
      ...this.findByIdNoError(book.id),
      ...book,
    };

    const bookIndex =
      book.prevId !== book.id
        ? this.findByIndex(book.prevId)
        : this.findByIndex(book.id);

    this.books[bookIndex] = bookToUpdate;

    return bookToUpdate;
  }

  public findByIsbn(isbn: string): Book {
    const found = this.books.find((b) => b.isbn === isbn);

    return found;
  }
}
