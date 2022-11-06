import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
  const { order, sortBy, category, currentPage, search } = params
  const { data } = await axios.get(
    `https://631e26c4cc652771a4926184.mockapi.io/mock/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );

  return data
})

const initialState = {
  items: [],
  status: 'loading' // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error'
      state.items = [];
    }
  }
})

export const pizzaDataSelector = state => state.pizza;

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer