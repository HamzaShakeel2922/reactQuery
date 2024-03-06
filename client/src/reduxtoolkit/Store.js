import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {api} from '../api/usersApi';
import userSlice from './userSlice';
import authSlice from './authSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  users: userSlice,
  auth: authSlice,
});

const myStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(myStore.dispatch);
export default myStore;
