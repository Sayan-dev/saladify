import {ApiResponse, User, UserRegisterRequest} from '../../types/entities';
import http from '../http';

const BASE_URL = '/api/auth/user';

export const registerWithEmail = (
  data: Omit<UserRegisterRequest, 'password'>,
) => http.post<ApiResponse<{user: User}>>(`${BASE_URL}/signup`, data);

export const login = () =>
  http.post<ApiResponse<{user: User}>>(`${BASE_URL}/login`);
export const getUser = () =>
  http.get<ApiResponse<{user: User}>>(`${BASE_URL}/`);
