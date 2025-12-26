import { createSlice } from "@reduxjs/toolkit";
import type { MusicItem } from "@/utils/browse";
import { audioManager } from "@/utils/audio";

export const MusicSlice = createSlice({
  name: "Music",
  initialState: {
    current: {} as MusicItem & { isPlaying: boolean },
    local: [] as MusicItem[],
    duration: 0,
    currentTime: 0,
    isRandom: false,
  },
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
      // 非本地音樂就不用特別處理
      if (state.current.type !== "local") return;
      // 本地音樂就播放
      if (state.current.isPlaying) {
        audioManager.setSrc((state.current as MusicItem).url || "");
        audioManager.play();
      }
    },
    setIsPlaying: (state, action) => {
      if (!state.current) return;
      state.current.isPlaying = action.payload;
      audioManager[action.payload ? "play" : "pause"]();
    },
    setLocalMusic: (state, action) => {
      state.local = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setIsRandom: (state, action) => {
      state.isRandom = action.payload;
    },
  },
});

export const { setCurrent, setIsPlaying, setLocalMusic, setDuration, setCurrentTime, setIsRandom } = MusicSlice.actions;
export default MusicSlice.reducer;
