import { AxiosResponse } from 'axios';
import PathRoutes from '../constants/PathRoutes';
import IGoodRequest from '../interfaces/IGoodRequest';
import IWriter from '../interfaces/IWriter';
import axiosApi from './axios';

const getWriters = async () => {
  const writers = await axiosApi
    .get<IGoodRequest<IWriter[]>, AxiosResponse<IGoodRequest<IWriter[]>>>(PathRoutes.WRITERS);

  return writers.data.data;
};

export default getWriters;
