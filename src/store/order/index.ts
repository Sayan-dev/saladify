import { create, StateCreator } from 'zustand';
import { Order } from '../../types/entities';

interface OrderSlice {
  orders: Record<string, Order>;
  total: number;
  createOrder: (order: Order) => void;
  addOrder: (orderId: string) => void;
  subOrder: (orderId: string) => void;
  removeOrder: (orderId: string) => void;
}

type Slice = OrderSlice;

const useOrderSlice: StateCreator<Slice, [], [], OrderSlice> = set => ({
  orders: {},
  total: 0,
  createOrder: (order: Order) =>
    set(state => {
      const newState = { ...state };
      if (newState.orders[order._id]) return newState;
      newState.orders = {
        ...newState.orders,
        [order._id]: order,
      };
      newState.total += order.quantity * order.price;
      return newState;
    }),
  addOrder: (orderId: string) =>
    set(prevState => {
      const newState = { ...prevState };
      if (newState.orders[orderId]) {
        newState.orders[orderId].quantity += 1;
        newState.total += newState.orders[orderId].price || 0;
      }

      return newState;
    }),
  subOrder: (orderId: string) =>
    set(prevState => {
      if (prevState.orders[orderId].quantity > 1) {
        const newState = { ...prevState };
        if (newState.orders[orderId]) {
          newState.orders[orderId].quantity -= 1;
          newState.total -= newState.orders[orderId].price || 0;
        }
        return newState;
      }
      return prevState;
    }),
  removeOrder: (orderId: string) =>
    set(prevState => {
      const newState = { ...prevState };
      if (newState.orders[orderId]) {
        newState.total -= newState.orders[orderId].price || 0;

        delete newState.orders[orderId];
      }
      return newState;
    }),
});

const useOrder = create<Slice>()((...rest) => ({
  ...useOrderSlice(...rest),
}));

export default useOrder;
