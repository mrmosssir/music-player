import { createSlice } from "@reduxjs/toolkit";
import type { MusicTrack } from "@/utils/browse";
import type { MusicItem } from "@/utils/browse";

export const MusicSlice = createSlice({
  name: "Music",
  initialState: {
    current: null as null | (MusicTrack & { isPlaying: boolean }),
    local: [] as MusicItem[],
  },
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setIsPlaying: (state, action) => {
      if (!state.current) return;
      state.current.isPlaying = action.payload;
    },
    setLocalMusic: (state, action) => {
      state.local = action.payload;
    },
  },
});

export const { setCurrent, setIsPlaying, setLocalMusic } = MusicSlice.actions;

export default MusicSlice.reducer;
