import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import searchSlice from './slices/searchSlice';
import cartSlice from './slices/cartSlice';
import pizzaSlice from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    search: searchSlice,
    cart: cartSlice,
    pizza: pizzaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
