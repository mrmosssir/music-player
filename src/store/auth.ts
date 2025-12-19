import { createSlice } from "@reduxjs/toolkit";

import type { UserInfo } from "@/utils/user";
import cookie from "@/utils/cookie";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    token: cookie.get("token") || "",
    user: JSON.parse(localStorage.getItem("user") as string) || ({} as UserInfo),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { setToken, setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
