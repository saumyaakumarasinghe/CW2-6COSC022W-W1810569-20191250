import { AxiosError } from 'axios';

export interface User {
  id?: string;
  username: string;
  email: string;
  mobile?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export type ApiErrorResponse = AxiosError<ApiError>;
