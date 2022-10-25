import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    value: 'rating',
  },
  isAsc: false,
  activePage: 1,
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

    setActivePage(state, action) {
      state.activePage = action.payload;
    },

    setFilter(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.activePage = Number(action.payload.activePage);
    },
  },
});

export const { setCategory, setSort, setIsAsc, setActivePage, setFilter } = filterSlice.actions;
export default filterSlice.reducer;
