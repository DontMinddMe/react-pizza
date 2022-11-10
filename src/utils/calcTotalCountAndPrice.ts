import { CartItem } from '../store/slices/cartSlice';

export const calcTotal = () => {
  const data = window.localStorage.getItem('cart');
  let totalCount: number = 0;
  let totalPrice: number = 0;

  if (data) {
    const json: CartItem[] = JSON.parse(data);

    json.map((value) => (totalCount += value.count));
    json.map((value) => (totalPrice += value.price * value.count));
  }

  return {
    totalPrice,
    totalCount,
  };
};
