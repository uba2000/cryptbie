import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchedQuery: '',
}

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    saveSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  }
})

export const { saveSearchedQuery } = logsSlice.actions;
export default logsSlice.reducer;

