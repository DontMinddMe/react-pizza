import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotal } from '../../utils/calcTotalCountAndPrice';
import { getItems } from '../../utils/getItemsFromLocalStorage';

export type CartItem = {
  title: string;
  imageUrl: string;
  price: number;
  id: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartItem[];
}

const { totalPrice, totalCount } = calcTotal();

const initialState: CartSliceState = {
  items: getItems(),
  totalPrice,
  totalCount,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count += 1;
        state.totalPrice += findItem.price;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
        state.totalPrice += action.payload.price;
      }
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count -= 1;
        state.totalPrice -= findItem.price;
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },

    updateCount(state) {
      let count = 0;
      state.items.map((value) => (count += value.count));
      state.totalCount = count;
    },

    updatePrice(state) {
      let price = 0;
      state.items.map((value) => (price += value.price * value.count));
      state.totalPrice = price;
    },
  },
});

export const { addItem, removeItem, clearCart, updateCount, minusItem, updatePrice } =
  cartSlice.actions;
export default cartSlice.reducer;
