import { configureStore } from "@reduxjs/toolkit";
import abs from "./features/abs";

export const store = configureStore({
  reducer: {
    abs: abs,
  },
});
