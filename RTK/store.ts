import { configureStore } from "@reduxjs/toolkit";
import sidebar from "./features/sidebar";
import cart from "./features/cart";

export const store = configureStore({
  reducer: {
    sidebar: sidebar,
    cart: cart,
  },
});
