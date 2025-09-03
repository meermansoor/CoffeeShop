import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  contactNumber: '',
  email: '',
  address: '',
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { name, contactNumber, email, address } = action.payload;
      state.name = name;
      state.contactNumber = contactNumber;
      state.email = email;
      state.address = address;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = '';
      state.contactNumber = '';
      state.email = '';
      state.address = '';
      state.isLoggedIn = false;
    },
    updateProfile: (state, action) => {
      const { name, contactNumber, email, address } = action.payload;
      if (name !== undefined) state.name = name;
      if (contactNumber !== undefined) state.contactNumber = contactNumber;
      if (email !== undefined) state.email = email;
      if (address !== undefined) state.address = address;
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
