import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import navigationSlice from "./navigationSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    navigation: navigationSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
