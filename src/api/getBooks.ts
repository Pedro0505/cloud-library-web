import { AxiosResponse } from 'axios';
import PathRoutes from '../constants/PathRoutes';
import IBook from '../interfaces/IBook';
import IGoodRequest from '../interfaces/IGoodRequest';
import axiosApi from './axios';

const getBooks = async () => {
  const books = await axiosApi
    .get<IGoodRequest<IBook[]>, AxiosResponse<IGoodRequest<IBook[]>>>(PathRoutes.BOOKS);

  return books.data.data;
};

export default getBooks;
