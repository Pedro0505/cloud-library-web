import { AxiosResponse } from 'axios';
import PathRoutes from '../constants/PathRoutes';
import IGoodRequest from '../interfaces/IGoodRequest';
import IWriter from '../interfaces/IWriter';
import axiosApi from './axios';

const getWriterById = async (id: string): Promise<IGoodRequest<IWriter>> => {
  const writers = await axiosApi.get<
  IGoodRequest<IWriter>,
  AxiosResponse<IGoodRequest<IWriter>>
  >(`${PathRoutes.WRITERS}/${id}`);

  return writers.data;
};

export default getWriterById;
