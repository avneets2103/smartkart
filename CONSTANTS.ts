import { sidebarMenuItems } from "./Interfaces";

const minPassLength = 6;
// const BACKEND_URI="http://localhost:4000/api/v1" 
const BACKEND_URI="https://smartkart-server2.vercel.app/api/v1"
// const BACKEND_URI = "https://smartkart-server2.vercel.app/api/v1";
const RENDER_BACKEND_URI= "https://smartkart-server.onrender.com/api/v1";
const WAITLIST_URI="https://smartkart-waitlist-server.vercel.app/api/v1";
// const WAITLIST_URI = "http://localhost:4001/api/v1";
const otpLength = 4;
const otpGap = 60;
const accessTokenExpiration = 60 * 60 * 24 * 100; // 7 days
const refreshTokenExpiration = 60 * 60 * 24 * 200; // 30 days

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
    RENDER_BACKEND_URI,
    WAITLIST_URI,
    minPassLength,
    otpLength,
    otpGap,
    sidebarMenu,
    accessTokenExpiration,
    refreshTokenExpiration
};