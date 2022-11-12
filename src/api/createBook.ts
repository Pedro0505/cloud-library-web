import PathRoutes from '../constants/PathRoutes';
import IBook from '../interfaces/IBook';
import IBookCreate from '../interfaces/IBookCreate';
import IGoodRequest from '../interfaces/IGoodRequest';
import axiosApi from './axios';

const createBook = async (book: IBookCreate): Promise<IGoodRequest<IBook>> => {
  const books = await axiosApi.post(PathRoutes.BOOKS, book);

  return books.data;
};

export default createBook;
