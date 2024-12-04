import { fetchData, postData, putData, deleteData } from '../utils/api.ts';

export const getResearches = async () => fetchData('/researches/getResearches');

export const addResearch = async (data: FormData) =>
  postData('/researches/addResearch', data, true);

export const updateResearch = async (id: string, data: FormData) =>
  putData(`/researches/updateResearchById/${id}`, data, true);

export const deleteResearch = async (id: string) =>
  deleteData(`/researches/deleteResearchById/${id}`);
