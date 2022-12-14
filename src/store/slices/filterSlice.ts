import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Sort = {
  name: string;
  value: 'title' | 'rating' | 'price';
};

export const categoriesArray = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const sortTypes: Sort[] = [
  { name: 'популярности', value: 'rating' },
  { name: 'цене', value: 'price' },
  { name: 'алфавиту', value: 'title' },
];

interface FilterSliceState {
  categoryId: number;
  sort: Sort;
  isAsc: boolean;
  activePage: number;
}

const initialState: FilterSliceState = {
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
    setCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },

    setSort(state, action: PayloadAction<Sort>) {
      state.sort.name = action.payload.name;
      state.sort.value = action.payload.value;
    },

    setIsAsc(state) {
      state.isAsc = !state.isAsc;
    },

    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },

    setFilter(
      state,
      action: PayloadAction<{ categoryId: string; activePage: string; sort: Sort }>,
    ) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.activePage = Number(action.payload.activePage);
    },
  },
});

export const { setCategory, setSort, setIsAsc, setActivePage, setFilter } = filterSlice.actions;
export default filterSlice.reducer;
