import IBook from './IBook';
import IWriter from './IWriter';

interface IBookWriter {
  booksId: number;
  writersId: number;
  books: IBook;
  writers: IWriter;
}

export default IBookWriter;
