import {useEffect} from 'react';
import useProductStore from '../store/product/selector';
import {useProducts} from '../api/queries/product.queries';
import {Order} from '../types/entities';

export default function useProductList(): [Order[], () => void, boolean] {
  const [productList, , , , , updateProductList] = useProductStore();
  const products = useProducts();

  const handleUpdateProduct = () => {
    // products.refetch();
    console.log('Hello');
  };

  useEffect(() => {
    if (products.data) {
      updateProductList(products.data);
    }
  }, [products.data, updateProductList]);

  return [productList, handleUpdateProduct, products.isLoading];
}
