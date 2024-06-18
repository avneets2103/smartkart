import { sidebarMenuItems } from "./Interfaces";

const minPassLength = 6;
const BACKEND_URI="http://localhost:5002/api/v1" 
const otpLength = 4;
const otpGap = 60;
const accessTokenExpiration = 60 * 60 * 24 * 7; // 7 days
const refreshTokenExpiration = 60 * 60 * 24 * 30; // 30 days

const sidebarMenu:Array<sidebarMenuItems>= [
    {
        name: "My Cart",
        path: "myCart",
        iconS: "../icons/cart.S.png",
        iconNS: "../icons/cart.NS.png",
    },
    {
        name: "History",
        path: "history",
        iconS: "../icons/history.S.png",
        iconNS: "../icons/history.NS.png",
    },
    {
        name: "Expenses",
        path: "expenses",
        iconS: "../icons/expenses.S.png",
        iconNS: "../icons/expenses.NS.png",
    },
    {
        name: "Wishlist",
        path: "wishlist",
        iconS: "../icons/wishlist.S.png",
        iconNS: "../icons/wishlist.NS.png",
    },
    {
        name: "Price Tracker",
        path: "priceTracker",
        iconS: "../icons/priceTracker.S.svg",
        iconNS: "../icons/priceTracker.NS.svg",
    },
]

export { 
    BACKEND_URI,
    minPassLength,
    otpLength,
    otpGap,
    sidebarMenu,
    accessTokenExpiration,
    refreshTokenExpiration
};