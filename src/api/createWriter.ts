import PathRoutes from '../constants/PathRoutes';
import IGoodRequest from '../interfaces/IGoodRequest';
import IWriter from '../interfaces/IWriter';
import IWriterCreate from '../interfaces/IWriterCreate';
import axiosApi from './axios';

const createWriter = async (book: IWriterCreate): Promise<IGoodRequest<IWriter>> => {
  const createdWriter = await axiosApi.post(PathRoutes.WRITERS, book);

  return createdWriter.data;
};

export default createWriter;
