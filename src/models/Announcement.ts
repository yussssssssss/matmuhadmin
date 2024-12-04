import { ResponseUserDto } from './User.ts';

export interface RequestAnnouncementDto {
  id: number;
  title: string;
  content: string;
}

export interface ResponseAnnouncementDto {
  id: string; // UUID format
  title: string;
  publishDate: string; // ISO 8601 format
  content: string;
  coverImageUrl?: string;
  publisher: ResponseUserDto;
}
