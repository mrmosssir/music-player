import qs from "qs";

import cookie from "@/utils/cookie";
import { axiosRequest } from "@/utils/base";

const login = function () {
    const url = `${process.env.AUTH_BASE_URL}/authorize`;

    const id = process.env.CLIENT_ID;
    const type = "code";
    const redirect = process.env.SITE_DOMAIN;
    const scopes = "user-read-private user-read-email";

    const query = `client_id=${id}&response_type=${type}&redirect_uri=${redirect}&scope=${scopes}`;

    // 跳轉到 Spotify 登入頁
    location.href = `${url}?${query}`;
};

const logout = function () {
    cookie.set("token", "", 0);
    localStorage.removeItem("refresh_token");
    location.href = "/music-player/";
};

const clientToken = async function (code, state) {

    const auth = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    const url = `${process.env.AUTH_BASE_URL}/api/token`;
    const body = {
        grant_type: "authorization_code",
        redirect_uri: process.env.SITE_DOMAIN,
        code: code
    };
    const config = {
        method: "POST",
        url,
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(body),
    };
    const { data } = await axiosRequest(config);
    
    if (data.error) return false;

    return data;
};

const adminToken = async function () {
    const auth = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    const url = `${process.env.AUTH_BASE_URL}/api/token`;
    const body = {
        grant_type: "client_credentials",
        redirect_uri: process.env.SITE_DOMAIN,
        scope: "user-read-private user-read-email",
    };
    const config = {
        method: "POST",
        url,
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(body),
    };

    const { data } = await axiosRequest(config);

    if (data.error) return false;

    // cookie.set('admin_token', data.access_token, data.expires_in);

    return data.access_token;
};

export { login, logout, clientToken, adminToken };
