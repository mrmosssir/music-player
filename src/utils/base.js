import axios from "axios";
import qs from "qs";

import cookie from "@/utils/cookie";
import { logout } from "@/utils/auth";

const tokenRefresh = async function () {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        logout();
        return;
    }
    const url = `${process.env.AUTH_BASE_URL}/api/token`;
    const body = {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.CLIENT_ID
    };
    const config = {
        method: "POST",
        url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(body),
    };

    const { data } = await axios(config);

    if (data.error) return false;

    cookie.set("token", tokenData.access_token, tokenData.expires_in);
    localStorage.setItem("refresh_token", tokenData.refresh_token);
    location.href = "/music-player/";
}

export const axiosRequest = async function (config) {
    const res = await axios(config);
    switch (res.status) {
        case 401:
            tokenRefresh();
            break;
        default:
            return res;
    }
}