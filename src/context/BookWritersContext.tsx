import React, { createContext, useState } from 'react';
import IBook from '../interfaces/IBook';
import getBooks from '../api/getBooks';
import getWriters from '../api/getWriters';
import IBookWriter from '../interfaces/IBookWriter';
import IWriter from '../interfaces/IWriter';
import IGetBookWritersContextType from './interfaces/IGetBookWritersContextType';
import IGetBookWritersProps from './interfaces/IGetBookWritersProps';
import getBooksWriters from '../api/getBooksWriters';
import IWriterCreate from '../interfaces/IWriterCreate';
import createWriter from '../api/createWriter';
import IBookCreate from '../interfaces/IBookCreate';
import createBook from '../api/createBook';
import getWriterById from '../api/getWriterById';

const initialValue = {
  books: [],
  writers: [],
  booksWriters: [],
  getAllBooks: async () => { },
  getAllBookWriters: async () => { },
  getAllWriters: async () => { },
  handleSetWriters: async () => { },
  handleSetBooks: async () => {},
  fetchWriterByName: async () => ({
    data: {
      id: 1, name: '', sex: '', birthDate: '',
    },
  }),
};

export const BookWritersContext = createContext<IGetBookWritersContextType>(initialValue);

export const BookWritersProvider = ({ children }: IGetBookWritersProps) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [writers, setWriters] = useState<IWriter[]>([]);
  const [booksWriters, setBooksWriters] = useState<IBookWriter[]>([]);

  async function getAllBooks() {
    try {
      const allBooks = await getBooks();

      setBooks(allBooks);
    } catch (error) {
      setBooks([]);
    }
  }

  async function getAllWriters() {
    try {
      const allWriters = await getWriters();

      setWriters(allWriters);
    } catch (error) {
      setWriters([]);
    }
  }

  async function getAllBookWriters() {
    try {
      const allBooksWriters = await getBooksWriters();

      setBooksWriters(allBooksWriters);
    } catch (error) {
      setBooksWriters([]);
    }
  }

  async function handleSetWriters(newWriter: IWriterCreate) {
    const writer = await createWriter(newWriter);

    setWriters((prev) => [...prev, writer.data]);
  }

  async function handleSetBooks(newBook: IBookCreate, writerId: number) {
    const book = await createBook(newBook);
    const writer = await getWriterById(writerId.toString());

    const newWriterBook = {
      booksId: book.data.id,
      writersId: writer.data.id,
      books: book.data,
      writers: writer.data,
    };

    setBooksWriters((prev) => [...prev, newWriterBook]);
  }

  async function fetchWriterByName(name: string) {
    const writer = await getWriterById(name);

    return writer;
  }

  const context = {
    books,
    writers,
    booksWriters,
    getAllBooks,
    getAllBookWriters,
    getAllWriters,
    handleSetWriters,
    handleSetBooks,
    fetchWriterByName,
  };

  return (
    <BookWritersContext.Provider value={ context }>
      { children }
    </BookWritersContext.Provider>
  );
};
