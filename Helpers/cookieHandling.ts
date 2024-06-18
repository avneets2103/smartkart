import { accessTokenExpiration, refreshTokenExpiration } from "@/CONSTANTS";
import Cookies from "js-cookie";

export const tokenCookies = (accessToken: string, refreshToken: string) => {
    Cookies.set("accessToken", accessToken, {expires: accessTokenExpiration});
    Cookies.set("refreshToken", refreshToken, {expires: refreshTokenExpiration});
}
