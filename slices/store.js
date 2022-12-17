import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './globalSlice';
import paymentSlice from './paymentSlice';
import navigationSlice from './navigationSlice';
import logsSlice from './logsSlice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    navigation: navigationSlice,
    payment: paymentSlice,
    logs: logsSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
