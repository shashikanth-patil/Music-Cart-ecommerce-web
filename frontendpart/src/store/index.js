import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./userSlice";

const store = configureStore({
  reducer: {
    authentications: authenticationSlice,
  },
});

export default store;
