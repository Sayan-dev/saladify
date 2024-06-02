import {useQueryClient} from '@tanstack/react-query';
import {useLikeDislikeProduct} from '../api/queries/product.queries';
import useProductStore from '../store/product/selector';

const useLike = (productId: string): [boolean, () => void] => {
  const [productList, likeProduct] = useProductStore();
  const likeProductQuery = useLikeDislikeProduct();

  const product = productList.find(item => item._id === productId);
  const handleLike = (): void => {
    likeProduct(productId);
    likeProductQuery.mutate({
      productId: productId,
      like: !product?.liked,
    });
  };

  return [product?.liked || false, handleLike];
};

export default useLike;
