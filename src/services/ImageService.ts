import { postData } from '../utils/api';
import { DataResult } from '../models/DataResult';
import { ResponseImageDto } from '../models/Image';

export const uploadImage = async (data: FormData): Promise<DataResult<ResponseImageDto>> => {
  return postData('/images/addImage', data, true);
};
