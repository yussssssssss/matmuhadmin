import { fetchData, postData, putData, deleteData } from '../utils/api.ts';
import { DataResult } from '../models/DataResult';
import { Result } from '../models/Result';
import { ResponseProjectDto } from '../models/Project';

export const getProjects = async (): Promise<DataResult<ResponseProjectDto[]>> =>
  fetchData('/projects/getProjects');

export const addProject = async (data: FormData): Promise<DataResult<ResponseProjectDto>> =>
  postData('/projects/addProject', data, true);

export const updateProject = async (id: string, data: FormData): Promise<DataResult<ResponseProjectDto>> =>
  putData(`/projects/updateProjectById/${id}`, data, true);

export const deleteProject = async (id: string): Promise<Result> =>
  deleteData(`/projects/deleteProjectById/${id}`);
