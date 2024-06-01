import useProduct from '.';
import {Order, Product} from '../../types/entities';

const useProductStore = () =>
  useProduct(state => [
    state.productList,
    state.likeProduct,
    state.addProduct,
    state.subProduct,
    state.updateProduct,
    state.updateProductList,
  ]) as [
    Order[],
    (productId: string) => void,
    (productId: string) => void,
    (productId: string) => void,
    (product: Order) => void,
    (products: Product[]) => void,
  ];
export default useProductStore;
