import cookie from "@/utils/cookie";
import { axiosRequest } from "@/utils/base";

export type Token = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

const redirect = import.meta.env.MODE === "production" ? import.meta.env.VITE_SITE_DOMAIN_PROD : import.meta.env.VITE_SITE_DOMAIN_DEV;

const login = (): void => {
  const url = `${import.meta.env.VITE_AUTH_BASE_URL}/authorize`;

  const id = import.meta.env.VITE_CLIENT_ID;
  const type = "code";
  const scopes = "user-read-private user-read-email";

  const query = `client_id=${id}&response_type=${type}&redirect_uri=${redirect}&scope=${scopes}`;

  // 跳轉到 Spotify 登入頁
  location.href = `${url}?${query}`;
};

const logout = (): void => {
  cookie.set("token", "", 0);
  localStorage.removeItem("refresh_token");
  location.href = "/music-player/";
};

const clientToken = async (code: string): Promise<Token | null> => {
  const auth = btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`);
  const url = `${import.meta.env.VITE_AUTH_BASE_URL}/api/token`;
  const body = {
    grant_type: "authorization_code",
    redirect_uri: redirect,
    code: code,
  };

  const config = {
    method: "POST",
    url,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams(body).toString(),
  };

  try {
    const { data } = await axiosRequest(config);

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    };
  } catch (error) {
    return null;
  }
};

const adminToken = async (): Promise<string> => {
  const auth = btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`);
  const url = `${import.meta.env.VITE_AUTH_BASE_URL}/api/token`;
  const body = {
    grant_type: "client_credentials",
    redirect_uri: redirect,
    scope: "user-read-private user-read-email",
  };

  const config = {
    method: "POST",
    url,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams(body).toString(),
  };

  try {
    const { data } = await axiosRequest(config);

    // cookie.set('admin_token', data.access_token, data.expires_in);

    return data.access_token;
  } catch (error) {
    return "";
  }
};

export { login, logout, clientToken, adminToken };
