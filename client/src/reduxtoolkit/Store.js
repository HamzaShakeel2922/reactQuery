import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {api} from '../api/usersApi';
import userSlice from './userSlice';

const myStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(myStore.dispatch);
export default myStore;
