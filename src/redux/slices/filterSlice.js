import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'за популярністю',
    sortProperty: 'rating'
  }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setQuery(state, action) {
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload)
      state.currentPage = Number(action.payload)
    }
  }
});

export const { setCategoryId, setSort, setCurrentPage, setQuery } = filterSlice.actions;
export default filterSlice.reducer