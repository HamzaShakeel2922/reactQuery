import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userList: [],
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userList = action.payload;
    },
    deleteUser: (state, action) => {
      console.log(action);
    },
  },
});

export const {setUser, deleteUser} = userSlice.actions;

export default userSlice.reducer;
