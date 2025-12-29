import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // array of product objects
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    addProducts:(state, action) => {
      state.item = state.items.push(...action.payload);
    },
  },
});

export const { setProducts, addProduct , addProducts} = productSlice.actions;
export default productSlice.reducer;
