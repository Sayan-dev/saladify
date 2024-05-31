import {Order} from '../../types/entities';
import useOrder from '.';

const useOrderStore = () =>
  useOrder(state => [
    state.orders,
    state.total,
    state.createOrder,
    state.addOrder,
    state.subOrder,
    state.removeOrder,
  ]) as [
    Record<string, Order>,
    number,
    (order: Order) => void,
    (orderId: string) => void,
    (orderId: string) => void,
    (orderId: string) => void,
  ];
export default useOrderStore;
