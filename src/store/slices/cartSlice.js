import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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

    removeItem(state, action) {
      state.items.filter((obj) => obj.id !== action.payload.id);
    },

    clearCart(state) {
      state.items = [];
    },

    updateCount(state) {
      let count = 0;
      state.items.map((value) => (count += value.count));
      state.totalCount = count;
    },
  },
});

export const { addItem, removeItem, clearCart, updateCount } = cartSlice.actions;
export default cartSlice.reducer;
