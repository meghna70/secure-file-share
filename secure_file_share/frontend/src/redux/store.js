import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fileReducer from './slices/fileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    file: fileReducer,
  },
});

export default store;

