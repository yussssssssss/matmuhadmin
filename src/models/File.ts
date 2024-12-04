import { ResponseUserDto } from './User';

export interface ResponseFileDto {
  id: string; // UUID format
  name: string;
  type: string;
  url: string;
  createdBy: ResponseUserDto;
}
