import { createSlice } from "@reduxjs/toolkit";
import type { MusicTrack } from "@/utils/browse";

export const MusicSlice = createSlice({
  name: "Music",
  initialState: {
    current: null as null | (MusicTrack & { isPlaying: boolean }),
  },
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setIsPlaying: (state, action) => {
      if (!state.current) return;
      state.current.isPlaying = action.payload;
    },
  },
});

export const { setCurrent, setIsPlaying } = MusicSlice.actions;

export default MusicSlice.reducer;
