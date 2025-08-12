import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(item => item.name === newItem.name);

      if (existingItem) {
        existingItem.quantity += 1; // or += newItem.quantity if passed
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item.name !== id);
    },

    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.name === action.payload);
      if (item) item.quantity += 1;
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.name === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // If quantity is 1, remove the item
        state.cartItems = state.cartItems.filter(item => item.name !== action.payload);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
