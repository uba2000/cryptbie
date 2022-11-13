import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showTabs: true,
};

export const navigationSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setShowTabs: (state, action) => {
      state.showTabs = action.payload;
    },
  },
});

export const { setShowTabs } = navigationSlice.actions;

export default navigationSlice.reducer;
