import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice.js';
import cartReducer from './slices/cartSlice.js';
import userReducer from './slices/userSlice.js';
import favouritesReducer from './slices/favouriteSlice.js'

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    favourites: favouritesReducer
  },
});

export default store;
