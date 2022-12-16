import {
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { get, post, setHeaders } from '../utilities/http';

export const paymentStates = {
  BASE: 'base',
  FETCHING: 'fetching',
  ERROR: 'error',
  FETCHED: 'fetched',
};

const initialState = {
  data: null,
  status: paymentStates.BASE,
  error: '',
  recordTransaction: {
    data: null,
    status: paymentStates.BASE,
    error: '',
  },
};

export const fetchPayments = createAsyncThunk(
  'payment/fetchPayments',
  async (token, { rejectWithValue }) => {
    try {
      const { response } = await get({
        url: '/user/get-level-payments',
        headers: setHeaders({ token }),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const recordPaymentTransaction = createAsyncThunk(
  'payment/recordPaymentTransaction',
  async (
    { tx_ref, tx_id, amount, payment_id, token },
    { rejectWithValue }
  ) => {
    try {
      const { response } = await post({
        url: '/user/record-transaction',
        data: { tx_ref, tx_id, amount, payment_id },
        headers: setHeaders({ token }),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentRecordStatus: (state) => {
      state.recordTransaction.status =
        initialState.recordTransaction.status;
    },
  },
  extraReducers: (builder) => {
    // fetchPayments reducer
    builder.addCase(fetchPayments.pending, (state) => {
      state.status = paymentStates.FETCHING;
    });
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = paymentStates.FETCHED;
    });
    builder.addCase(fetchPayments.rejected, (state) => {
      state.status = paymentStates.ERROR;
    });

    // recordPaymentTransaction reducer
    builder.addCase(recordPaymentTransaction.pending, (state) => {
      state.recordTransaction.status = paymentStates.FETCHING;
    });
    builder.addCase(
      recordPaymentTransaction.fulfilled,
      (state, action) => {
        state.recordTransaction.data = action.payload;
        state.recordTransaction.status = paymentStates.FETCHED;
      }
    );
    builder.addCase(recordPaymentTransaction.rejected, (state) => {
      state.recordTransaction.status = paymentStates.ERROR;
    });
  },
});

export const selectPayment = (state) => state.payment;
export const selectRecordTransaction = (state) =>
  state.payment.recordTransaction;

export default paymentSlice.reducer;
export const { resetPaymentRecordStatus } = paymentSlice.actions;
