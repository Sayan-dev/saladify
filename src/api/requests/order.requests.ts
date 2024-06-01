import { ApiResponse, PreviousOrder } from '../../types/entities';
import http from '../http';

const BASE_URL = '/api/order';

export type OrderRequest = {
  orderItems: OrderItemRequest[];
  total: number;
  address: string;
  contact: string;
  mode: string;
};

export type OrderItemRequest = {
  productId: string;
  quantity: number;
};

export const createOrder = async (data: OrderRequest) => {
  const response = await http.post<ApiResponse<null>>(`${BASE_URL}`, data);
  return response;
};

export const fetchAllOrders = async () => {
  const response = await http.get<ApiResponse<PreviousOrder[]>>(`${BASE_URL}`);
  return response;
};
export const fetchOrder = async (orderId?: string) => {
  const response = await http.get<ApiResponse<PreviousOrder>>(`${BASE_URL}/${orderId}`);
  return response;
};
