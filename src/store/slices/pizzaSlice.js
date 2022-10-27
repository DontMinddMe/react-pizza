import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('pizza/fetchItemsStatus', async (props) => {
  const { sort, category, order, search, activePage } = props;
  const { data } = await axios.get(
    `https://6349481b0b382d796c8241e2.mockapi.io/items?page=${activePage}&limit=4&sortBy=${
      sort.value
    }&order=${sort.value === 'title' ? 'asc' : order}${category}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: '', // loading / success / error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchItems.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
