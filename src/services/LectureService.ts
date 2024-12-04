import { DataResult } from '../models/DataResult';
import { Result } from '../models/Result';
import { RequestLectureDto } from '../models/Lecture';
import { fetchData, postData, putData, deleteData } from '../utils/api';

export const getLectures = async (): Promise<DataResult<RequestLectureDto[]>> =>
  fetchData('/lectures/getLectures');

export const addLecture = async (data: RequestLectureDto): Promise<Result> =>
  postData('/lectures/addLecture', data);

export const updateLecture = async (id: string, data: RequestLectureDto): Promise<Result> =>
  putData(`/lectures/updateLectureById/${id}`, data);

export const deleteLecture = async (id: string): Promise<Result> =>
  deleteData(`/lectures/deleteLectureById/${id}`);
