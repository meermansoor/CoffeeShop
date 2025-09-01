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
        console.log('Added to favourites:', product.name, 'Total favourites:', state.favouriteItems.length);
      } else {
        console.log('Product already in favourites:', product.name);
      }
    },

    removeFavourite: (state, action) => {
      const id = action.payload;
      const initialLength = state.favouriteItems.length;
      state.favouriteItems = state.favouriteItems.filter(item => item.id !== id);
      console.log('Removed from favourites. Before:', initialLength, 'After:', state.favouriteItems.length);
    },

    clearFavourites: (state) => {
      state.favouriteItems = [];
      console.log('Cleared all favourites');
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
