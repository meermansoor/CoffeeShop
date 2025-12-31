import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Default',
  contactNumber: '',
  email: '',
  address: {
    line1: '',
    line2: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
  },
  uid: '',
  idToken: '',
  refreshToken: '',
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { name, contactNumber, email, address, uid, idToken, refreshToken } = action.payload;
      state.name = name;
      state.contactNumber = contactNumber;
      state.email = email;
      state.address = normalizeAddress(address);
      state.uid = uid || '';
      state.idToken = idToken || '';
      state.refreshToken = refreshToken || '';
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = '';
      state.contactNumber = '';
      state.email = '';
      state.address = { line1: '', line2: '', city: '', province: '', postalCode: '', country: '' };
      state.uid = '';
      state.idToken = '';
      state.refreshToken = '';
      state.isLoggedIn = false;
    },
    updateProfile: (state, action) => {
      const { name, contactNumber, email, address } = action.payload;
      if (name !== undefined) state.name = name;
      if (contactNumber !== undefined) state.contactNumber = contactNumber;
      if (email !== undefined) state.email = email;
      if (address !== undefined) state.address = normalizeAddress(address);
    },
    setAddress: (state, action) => {
      state.address ={
        ...state.address, 
        ...action.payload,
      }
    }
  },
});

function normalizeAddress(address) {
  if (!address) {
    return { line1: '', line2: '', city: '', province: '', postalCode: '', country: '' };
  }
  if (typeof address === 'string') {
    return { line1: address, line2: '', city: '', province: '', postalCode: '', country: '' };
  }
  const { line1 = '', line2 = '', city = '', province = '', postalCode = '', country = '' } = address;
  return { line1, line2, city, province, postalCode, country };
}

export const { login, logout, updateProfile, setAddress } = userSlice.actions;
export default userSlice.reducer;
