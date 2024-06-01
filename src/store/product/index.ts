import {create, StateCreator} from 'zustand';
import {Order, Product} from '../../types/entities';

interface ProductSlice {
  productList: Order[];
  likeProduct: (productId: string) => void;
  addProduct: (productId: string) => void;
  subProduct: (productId: string) => void;
  updateProduct: (product: Order) => void;
  updateProductList: (products: Product[]) => void;
}

type Slice = ProductSlice;

const useProductSlice: StateCreator<Slice, [], [], ProductSlice> = set => ({
  productList: [],
  likeProduct: (productId: string) =>
    set(prevState => {
      const newState = {...prevState};

      const productIndex = newState.productList.findIndex(
        item => item._id === productId,
      );
      if (productIndex > -1) {
        newState.productList[productIndex].liked =
          !newState.productList[productIndex].liked;
      }
      return newState;
    }),
  addProduct: (productId: string) =>
    set(prevState => {
      const newState = {...prevState};

      const productIndex = newState.productList.findIndex(
        item => item._id === productId,
      );
      if (productIndex > -1) {
        newState.productList[productIndex].quantity += 1;
      }
      return newState;
    }),
  subProduct: (productId: string) =>
    set(prevState => {
      const newState = {...prevState};

      const productIndex = newState.productList.findIndex(
        item => item._id === productId,
      );
      if (
        productIndex > -1 &&
        newState.productList[productIndex].quantity > 0
      ) {
        newState.productList[productIndex].quantity -= 1;
      }
      return newState;
    }),
  updateProduct: (product: Order) =>
    set(prevState => {
      const newState = {...prevState};

      const productIndex = newState.productList.findIndex(
        item => item._id === product._id,
      );
      newState.productList[productIndex] = {
        ...product,
      };
      return newState;
    }),
  updateProductList: (products: Product[]) =>
    set(prevState => {
      const newState = {...prevState};

      newState.productList = products.map(product => ({
        ...product,
        quantity: 0,
      }));
      return newState;
    }),
});

const useProduct = create<Slice>()((...rest) => ({
  ...useProductSlice(...rest),
}));

export default useProduct;
