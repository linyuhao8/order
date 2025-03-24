// store/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, user: null };

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = loginSlice.actions;
export default loginSlice.reducer;
