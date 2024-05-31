import { ContactNumber } from './entities';
import { GENDER_TYPE } from './enums';

export interface Pagination {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export type SignUpRequest = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UserRegisterRequest = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email: string;
  password: string;
};

export type UserUpdateRequest = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  language?: string;
  profilePicture?: string;
};

export type CreateRecipeRequest = {
  uid?: string;
  name?: string;
  description?: string;
};

export type BookmarkRequest = {
  uid?: string;
  recipeId?: string;
  bookmark?: boolean;
};

export type CheckoutDetails = {
  contact: string;
  address: string;
};
