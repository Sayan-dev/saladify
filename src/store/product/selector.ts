import useProduct from '.';
import { Order, Product } from '../../types/entities';

const useProductStore = () =>
  useProduct(state => [
    state.selectedProduct,
    state.selectProduct,
    state.likeProduct,
    state.addProduct,
    state.subProduct,
    state.productList,
    state.updateProductList,
  ]) as [
    Order | null,
    (product: Order | null) => void,
    (like: boolean | null) => void,
    () => void,
    () => void,
    Order[],
    (productList: Product[]) => void,
  ];
export default useProductStore;
