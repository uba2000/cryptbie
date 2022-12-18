import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, setHeaders } from '../utilities/http';

export const logStates = {
  BASE: 'base',
  FETCHING: 'fetching',
  ERROR: 'error',
  FETCHED: 'fetched',
};

const initialState = {
  searchedQuery: '',
  logs: [],
  status: logStates.BASE,
};

export const fetchPaymentLogs = createAsyncThunk(
  'logs/fetchPaymentLogs',
  async (request, thunkApi) => {
    try {
      const globalState = thunkApi.getState().global;
      const { response } = await get({
        url: '/lecturer/student-payment-logs',
        headers: setHeaders({
          token: globalState.loggedInUser.token,
        }),
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.toString());
    }
  }
);

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    saveSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    resetLogsStatus: (state) => {
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    // fetchPaymentLogs reducer
    builder.addCase(fetchPaymentLogs.pending, (state) => {
      state.status = logStates.FETCHING;
    });
    builder.addCase(fetchPaymentLogs.fulfilled, (state, action) => {
      state.logs = action.payload.data;
      state.status = logStates.FETCHED;
    });
    builder.addCase(fetchPaymentLogs.rejected, (state) => {
      state.status = logStates.ERROR;
    });
  },
});

export const selectLogs = (state) => state.logs;

export const { saveSearchedQuery, resetLogsStatus } =
  logsSlice.actions;
export default logsSlice.reducer;
