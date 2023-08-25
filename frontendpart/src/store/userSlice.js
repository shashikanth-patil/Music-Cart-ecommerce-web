import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: Boolean,
    cartValue: [],
  },
  reducers: {
    userLogin(state, action) {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    },
    userLogout(state, action) {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    },
    currentCartValue(state, action) {
      state.cartValue = action.payload;
    },
  },
});

export const { userLogin, userLogout, currentCartValue } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
