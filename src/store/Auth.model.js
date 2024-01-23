import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "Auth",
    initialState: {
        token: "",
        user: {}
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