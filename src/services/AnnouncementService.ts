import { DataResult } from '../models/DataResult';
import { Result } from '../models/Result';
import { ResponseAnnouncementDto } from '../models/Announcement';
import { postData, putData, deleteData, fetchData } from '../utils/api';

export const getAnnouncements = async (): Promise<DataResult<ResponseAnnouncementDto[]>> =>
  fetchData('/announcements/getAnnouncements');

export const addAnnouncement = async (data: FormData): Promise<DataResult<ResponseAnnouncementDto>> =>
  postData('/announcements/addAnnouncement', data, true);

export const updateAnnouncement = async (id: string, data: FormData): Promise<DataResult<ResponseAnnouncementDto>> =>
  putData(`/announcements/updateAnnouncementById/${id}`, data, true);

export const deleteAnnouncement = async (id: string): Promise<Result> =>
  deleteData(`/announcements/deleteAnnouncementById/${id}`);
