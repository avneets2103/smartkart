import { configureStore } from "@reduxjs/toolkit";
import sidebar from "./features/sidebar";

export const store = configureStore({
  reducer: {
    sidebar: sidebar,
    
  },
});
