import IBook from '../../interfaces/IBook';
import IBookCreate from '../../interfaces/IBookCreate';
import IBookWriter from '../../interfaces/IBookWriter';
import IGoodRequest from '../../interfaces/IGoodRequest';
import IWriter from '../../interfaces/IWriter';
import IWriterCreate from '../../interfaces/IWriterCreate';

interface IGetBookWritersContextType {
  books: IBook[];
  writers: IWriter[];
  booksWriters: IBookWriter[];
  getAllWriters(): Promise<void>;
  getAllBooks(): Promise<void>;
  getAllBookWriters(): Promise<void>;
  handleSetWriters(newWriter: IWriterCreate): Promise<void>;
  handleSetBooks(newBook: IBookCreate, writerId: number): Promise<void>;
  fetchWriterByName(name: string): Promise<IGoodRequest<IWriter>>;
}

export default IGetBookWritersContextType;
