import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const foundItem = state.items.find(obj => obj.id === action.payload.id)

      if (foundItem) {
        foundItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    },
    plusProduct(state, action) {
      const foundItem = state.items.find(obj => obj.id === action.payload)
      if (foundItem) {
        foundItem.count++
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    },
    minusProduct(state, action) {
      const foundItem = state.items.find(obj => obj.id === action.payload)
      if (foundItem) {
        if (foundItem.count !== 1) {
          foundItem.count--
        } else {
          state.items = state.items.filter(obj => obj.id !== action.payload)
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return (obj.price * obj.count) + sum
        }, 0)
      }
    },
    removeProduct(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    clearProducts(state, action) {
      state.items = []
      state.totalPrice = 0
    },
  }
});

export const cartSelector = (state) => state.cart;
export const cartByIdSelector = id => state => state.cart.items.find(obj => obj.id === id)

export const { addProduct, removeProduct, minusProduct, plusProduct, clearProducts } = cartSlice.actions;
export default cartSlice.reducer