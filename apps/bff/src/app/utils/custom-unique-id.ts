import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { BookInputUpdate } from '../books/book.model';
import { BooksService } from '../books/books.service';

@ValidatorConstraint({ name: 'IdExists' })
export class IdExistsRuleOnUpdate implements ValidatorConstraintInterface {
  constructor(private readonly bookService: BooksService) {}

  validate(id: string, args: ValidationArguments) {
    const object = args.object as BookInputUpdate;

    const idExists = this.bookService.findByIdNoError(id);

    if (!!idExists && object.id !== object.prevId) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Id ${args.value} is associated with another book`;
  }
}
