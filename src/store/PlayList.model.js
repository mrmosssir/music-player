import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import browse from "@/utils/browse";

export const handleFetchPlayList = createAsyncThunk("fetchPlayList", async ({ token, userId }) => {
    return await browse.getUserPlayList(token, userId);
});

const handleSetPlayListActive = function (state, payload) {
    state.playListActive = payload;
}

export const PlayListSlice = createSlice({
    name: "PlayList",
    initialState: {
        playList: [],
        playListActive: 0
    },
    reducers: {
        setPlayListActive: (state, action) => { handleSetPlayListActive(state, action.payload) },
    },
    extraReducers: (builder) => {
        builder.addCase(handleFetchPlayList.fulfilled, (state, { payload }) => {
            state.playList = payload;
            return;
        })
    }
});

export const {
    setPlayListActive
} = PlayListSlice.actions;

export default PlayListSlice.reducer;
