import {useQueryClient} from '@tanstack/react-query';
import {useLikeDislikeProduct} from '../api/queries/product.queries';
import useProductStore from '../store/product/selector';

const useLike = (): [boolean, () => void] => {
  const [selectedItem, , likeProduct] = useProductStore();
  const likeProductQuery = useLikeDislikeProduct();

  const queryClient = useQueryClient();

  const handleLike = (): void => {
    likeProduct(!selectedItem?.liked);
    if (selectedItem?._id)
      likeProductQuery.mutate({
        productId: selectedItem?._id,
        like: !selectedItem?.liked,
      });
  };

  return [selectedItem?.liked || false, handleLike];
};

export default useLike;
