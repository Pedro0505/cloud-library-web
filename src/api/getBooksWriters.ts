import { AxiosResponse } from 'axios';
import PathRoutes from '../constants/PathRoutes';
import IBookWriter from '../interfaces/IBookWriter';
import IGoodRequest from '../interfaces/IGoodRequest';
import axiosApi from './axios';

const getBooksWriters = async () => {
  const booksWriters = await axiosApi
    .get<
  IGoodRequest<IBookWriter[]>, AxiosResponse<IGoodRequest<IBookWriter[]>>>(PathRoutes.BOOKSWRITERS);

  return booksWriters.data.data;
};

export default getBooksWriters;
