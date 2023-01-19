import { sort } from './filterSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';

type pizzaItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

enum status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type searchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  currentPage: string;
  search: string;
}

export const fetchPizzas = createAsyncThunk<pizzaItem[], searchPizzaParams>('pizza/fetchPizzaStatus',
  async (params: searchPizzaParams) => {
    const { order, sortBy, category, currentPage, search } = params
    const { data } = await axios.get<pizzaItem[]>(
      `https://631e26c4cc652771a4926184.mockapi.io/mock/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data
  })


interface pizzaSliceState {
  items: pizzaItem[];
  status: status;
}

const initialState: pizzaSliceState = {
  items: [],
  status: status.LOADING // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = status.LOADING;
      state.items = [];
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = status.SUCCESS;
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = status.ERROR;
      state.items = [];
    })
  }

  // extraReducers: {
  //   [fetchPizzas.pending]: (state, action) => {
  //     state.status = 'loading'
  //     state.items = []
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload
  //     state.status = 'success'
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error'
  //     state.items = [];
  //   }
  // }
})

export const pizzaDataSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer