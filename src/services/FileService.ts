import { postData } from '../utils/api';
import { DataResult } from '../models/DataResult';
import { ResponseFileDto } from '../models/File';

export const uploadFile = async (data: FormData): Promise<DataResult<ResponseFileDto>> => {
  return postData('/files/addFile', data, true);
};
