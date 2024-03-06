import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loginMethod: 'firebase',
  logoutMethod: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginMethod: (state, action) => {
      state.loginMethod = action.payload;
    },
  },
});
export const {setLoginMethod} = authSlice.actions;
export default authSlice.reducer;
