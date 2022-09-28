import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('users/fetchPizzaStatus', async (params) => {
  const {order, sortBy, category, currentPage} = params
  const { data } = await axios.get(`https://631e26c4cc652771a4926184.mockapi.io/mock/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`);
  console.log(data)
  return data
  
})

const initialState = {
  items: []
}

const pizzaSlice = createSlice({
  name:'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
    extraReducers: {
      [fetchPizzas.pending] : (state, action) => {
        console.log('pending')
      },
      [fetchPizzas.fulfilled] : (state, action) => {
        console.log(state)
      },
      [fetchPizzas.rejected] : (state, action) => {
        console.log(state)
      }
    }
  }
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer