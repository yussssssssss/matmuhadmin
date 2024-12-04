import { ResponseUserDto } from './User';

export interface ResponseProjectDto {
  id: string; // UUID format
  name: string;
  description: string;
  date: string; // ISO 8601 format
  coverImageUrl?: string;
  publisher: ResponseUserDto;
}
