import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Sort } from './filterSlice';

export type Item = {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

type FetchItemsProps = {
  sort: Sort;
  category: string;
  order: string;
  search: string;
  activePage: number;
};

export const fetchItems = createAsyncThunk<Item[], FetchItemsProps>(
  'pizza/fetchItemsStatus',
  async (props) => {
    const { sort, category, order, search, activePage } = props;
    const { data } = await axios.get<Item[]>(
      `https://6349481b0b382d796c8241e2.mockapi.io/items?page=${activePage}&limit=4&sortBy=${
        sort.value
      }&order=${sort.value === 'title' ? 'asc' : order}${category}${search}`,
    );
    return data;
  },
);

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Item[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.items = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
