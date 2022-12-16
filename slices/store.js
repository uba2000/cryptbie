import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './globalSlice';
import paymentSlice from './paymentSlice';
import navigationSlice from './navigationSlice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    navigation: navigationSlice,
    payment: paymentSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
