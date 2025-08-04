import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  contactNumber: '',
  email: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { name, contactNumber, email } = action.payload;
      state.name = name;
      state.contactNumber = contactNumber;
      state.email = email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = '';
      state.contactNumber = '';
      state.email = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
