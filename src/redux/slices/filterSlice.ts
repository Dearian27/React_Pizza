import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  NAME_DESC = 'name',
}

export type sort = {
  name: string;
  sortProperty: SortPropertyEnum;
}


interface filterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: sort;
}

const initialState: filterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'за популярністю',
    sortProperty: SortPropertyEnum.RATING_DESC
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSeacrhValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setQuery(state, action) {
      state.sort = action.payload.newSort
      state.categoryId = Number(action.payload.categoryId)
      state.currentPage = Number(action.payload.currentPage)
    },
  }
});


export const filterSelector = (state: RootState) => state.filter;
export const sortSelector = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setQuery, setSeacrhValue } = filterSlice.actions;
export default filterSlice.reducer