import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteItems: [],
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const product = action.payload;
      const existing = state.favouriteItems.find(item => item.id === product.id);

      if (!existing) {
        state.favouriteItems.push(product);
      }
    },

    removeFavourite: (state, action) => {
      const id = action.payload;
      state.favouriteItems = state.favouriteItems.filter(item => item.id !== id);
    },
  },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
