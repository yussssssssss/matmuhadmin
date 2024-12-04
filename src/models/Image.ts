import { ResponseUserDto } from './User';

export interface ResponseImageDto {
  id: string; // UUID
  name: string;
  type: string;
  url: string;
  createdBy: ResponseUserDto;
}
