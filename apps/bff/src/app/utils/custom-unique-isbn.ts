import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { BookInputUpdate } from '../books/book.model';
import { BooksService } from '../books/books.service';

@ValidatorConstraint({ name: 'IsbnExists' })
export class IsbnExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly bookService: BooksService) {}

  validate(isbn: string, args: ValidationArguments) {
    const { targetName } = args;
    console.log(args);

    const isbnExists = this.bookService.findByIsbn(isbn);

    if (targetName === 'BookInput') {
      return !isbnExists;
    }

    const object = args.object as BookInputUpdate;

    // Checks if a book with isbn exists, but the ids are not matching
    if (!!isbnExists && isbnExists.id !== object.prevId) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return args.targetName === 'BookInput'
      ? `isbn ${args.value} already exists`
      : `isbn is associated with another book`;
  }
}
