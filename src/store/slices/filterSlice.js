import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    value: 'rating',
  },
  isAsc: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.categoryId = action.payload;
    },

    setSort(state, action) {
      state.sort.name = action.payload.name;
      state.sort.value = action.payload.value;
    },

    setIsAsc(state) {
      state.isAsc = !state.isAsc;
    },
  },
});

export const { setCategory, setSort, setIsAsc } = filterSlice.actions;
export default filterSlice.reducer;
