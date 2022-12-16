import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isBootstrapDataLoaded: false,
  loggedInUser: {
    __v: 0,
    _id: '639a6e81ff4d9375a358ecc6',
    createdAt: '2022-12-15T00:46:57.859Z',
    firstname: 'Noel',
    lastname: 'Uba',
    matNo: 'psc1707588',
    phoneNumber: '+2348177880475',
    roles: { Student: 2439 },
    currentLevel: '400',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWE2ZTgxZmY0ZDkzNzVhMzU4ZWNjNiIsImlhdCI6MTY3MTA2ODI3MiwiZXhwIjoxNjcxMjQxMDcyfQ.5V_EQtVyMJp3_RZVhhxfzPHxe2X7vBXV2inYBia3pmY',
    updatedAt: '2022-12-15T00:46:57.859Z',
    verified: 'false',
  },
  password: '',
  loginDate: '',
  locations: [],
  fullIsLoading: false,
  shareReceipt: {
    data: null,
    isOpen: false,
  },
};

export const logoutAction = createAction('global/logout');

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      const {
        isLoggedIn = false,
        user = '',
        password = '',
        logInDate = '',
      } = action.payload;
      state.isLoggedIn = isLoggedIn;
      state.loggedInUser = user;
      state.password = password;
      state.loginDate = logInDate;
      state.locations = initialState.locations;
      if (isLoggedIn) state.loginError = undefined;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    setBootstrapDataLoaded: (state) => {
      state.isBootstrapDataLoaded = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
      state.loggedInUser = initialState.loggedInUser;
      state.password = initialState.password;
      state.loginDate = initialState.loginDate;
      state.locations = initialState.locations;
      state.suppliers = initialState.suppliers;
    },
    pushLocation: (state, action) => {
      state.locations.push(action.payload);
    },
    toggleFullIsLoading: (state) => {
      state.fullIsLoading = !state.fullIsLoading;
    },
    toggleSharedReceiptDrawer: (state) => {
      state.shareReceipt.isOpen = !state.shareReceipt.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction, (state, action) => {
      state = initialState;
    });
  },
});

export const selectShareReceipt = (state) =>
  state.global.shareReceipt;

export const selectGlobal = (state) => state.global;

export const {
  setLoggedIn,
  setLoginError,
  setBootstrapDataLoaded,
  pushLocation,
  toggleFullIsLoading,
  toggleSharedReceiptDrawer,
} = globalSlice.actions;

export default globalSlice.reducer;
