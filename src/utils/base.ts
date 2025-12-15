import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import cookie from "@/utils/cookie";
import { logout } from "@/utils/auth";

export type { AxiosResponse };

const tokenRefresh = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    await logout();
    return;
  }
  const url = `${import.meta.env.VITE_AUTH_BASE_URL}/api/token`;
  const body = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: import.meta.env.VITE_CLIENT_ID,
  };
  const config = {
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams(body).toString(),
  };

  const { data } = await axios(config);

  if (data.error) return false;

  cookie.set("token", data.access_token, data.expires_in);
  localStorage.setItem("refresh_token", data.refresh_token);
  location.href = "/music-player/";
};

export const axiosRequest = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axios(config);
  switch (res.status) {
    case 401:
      await tokenRefresh();
      break;
  }
  return res;
};
