import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isBootstrapDataLoaded: false,
  loggedInUser: "",
  password: "",
  loginDate: "",
  locations: [],
};

export const logoutAction = createAction("global/logout");

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      const {
        isLoggedIn = false,
        user = "",
        password = "",
        logInDate = "",
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
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction, (state, action) => {
      state = initialState;
    });
  },
});

export const {
  setLoggedIn,
  setLoginError,
  setBootstrapDataLoaded,
  pushLocation,
} = globalSlice.actions;

export default globalSlice.reducer;
