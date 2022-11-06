import { configureStore } from '@reduxjs/toolkit';
import  profileSlise  from '../components/profile/profileSlice';
import userSlise  from './../components/users/usersSlice';

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
      return next({
          type: action
      })
  }
  return next(action)
};

export const store = configureStore({
  reducer: {
    users:userSlise,
    profile:profileSlise,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})
