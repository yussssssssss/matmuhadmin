import exp from 'constants';
import { postData } from '../utils/api';

interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: string; // JWT Token
  httpStatus: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return postData('/auth/login', data);
};

interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest) => {
  return postData('/auth/register', data);
}
