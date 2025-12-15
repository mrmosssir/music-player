import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@/hooks";

import { clientToken, adminToken } from "@/utils/auth";
import { getUserInfo } from "@/utils/user";
import cookie from "@/utils/cookie";

import { RootState } from "@/store";
import { setToken, setUser } from "@/store/Auth.model";

export const useAuth = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleCheckLogin = async () => {
    const cookieToken = cookie.get("token");

    // 如果有 token 則直接取 user 資料
    if (cookieToken) {
      await dispatch(setToken(cookieToken));

      const userData = await getUserInfo(cookieToken);
      if (!userData) return;
      dispatch(setUser(userData));

      return;
    }

    const code = query.get("code");

    // 如果是從登入頁面跳轉過來的，則直接設定 token 後跳轉
    if (code) {
      const tokenData = await clientToken(code);
      if (tokenData?.access_token) {
        cookie.set("token", tokenData.access_token, tokenData.expires_in);
        localStorage.setItem("refresh_token", tokenData.refresh_token);
        location.href = "/music-player/";
        return;
      }
    }

    // 如果都沒有登入，就拿 admin token
    const adminData = await adminToken();
    if (adminData) dispatch(setToken(adminData));
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  return { user };
};
