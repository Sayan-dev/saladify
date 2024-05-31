import {create, StateCreator} from 'zustand';
import {Order, Product} from '../../types/entities';

interface ProductSlice {
  selectedProduct: Order | null;
  productList: Order[];
  selectProduct: (product: Order) => void;
  likeProduct: (like: boolean) => void;
  addProduct: () => void;
  subProduct: () => void;
  updateProductList: (productList: Product[]) => void;
}

type Slice = ProductSlice;

const useProductSlice: StateCreator<Slice, [], [], ProductSlice> = set => ({
  selectedProduct: null,
  productList: [],
  selectProduct: (product: Order) =>
    set(state => ({state, selectedProduct: product})),
  likeProduct: (like: boolean) =>
    set(prevState => {
      const newState = {...prevState};
      if (newState.selectedProduct) {
        newState.selectedProduct.liked = like;
      }
      return newState;
    }),
  addProduct: () =>
    set(prevState => {
      const newState = {...prevState};
      if (newState.selectedProduct) {
        if (newState.selectedProduct.quantity)
          newState.selectedProduct.quantity += 1;
        else {
          newState.selectedProduct.quantity = 1;
        }
      }
      return newState;
    }),
  subProduct: () =>
    set(prevState => {
      if (prevState.selectedProduct && prevState.selectedProduct.quantity > 1) {
        const newState = {...prevState};
        if (newState.selectedProduct) {
          if (newState.selectedProduct.quantity)
            newState.selectedProduct.quantity -= 1;
          else {
            newState.selectedProduct.quantity = 1;
          }
        }
        return newState;
      }
      return prevState;
    }),
  updateProductList: (productList: Product[]) =>
    set(prevState => {
      const newProducts = productList.map(product => {
        const itemIndex = prevState.productList.findIndex(
          productItem => productItem._id === product._id,
        );
        if (itemIndex > -1) {
          return {
            ...product,
            quantity: prevState.productList[itemIndex].quantity,
          };
        }
        return {...product, quantity: 0};
      });
      const newState = {...prevState};
      newState.productList = newProducts;
      return newState;
    }),
});

const useProduct = create<Slice>()((...rest) => ({
  ...useProductSlice(...rest),
}));

export default useProduct;
