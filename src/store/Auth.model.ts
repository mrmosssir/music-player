import { createSlice } from "@reduxjs/toolkit";

import type { UserInfo } from "@/utils/user";

export const AuthSlice = createSlice({
    name: "Auth",
    initialState: {
        token: "" as string,
        user: {} as UserInfo,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setToken, setUser } = AuthSlice.actions;

export default AuthSlice.reducer;