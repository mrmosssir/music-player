import { type RefObject } from "react";
import { createSlice } from "@reduxjs/toolkit";

export const DisplaySlice = createSlice({
  name: "Display",
  initialState: {
    searchDisplay: false as boolean,
    maskDisplay: false as boolean,
    previewListCols: 7 as number,
    mainRef: null as RefObject<HTMLDivElement | null> | null,
  },
  reducers: {
    setSearchDisplay: (state, action) => {
      state.searchDisplay = action.payload;
    },
    setMaskDisplay: (state, action) => {
      state.maskDisplay = action.payload;
    },
    setPreviewListCols: (state, action) => {
      state.previewListCols = action.payload;
    },
    setMainRef: (state, action) => {
      state.mainRef = action.payload;
    },
  },
});

export const { setSearchDisplay, setMaskDisplay, setPreviewListCols, setMainRef } = DisplaySlice.actions;

export default DisplaySlice.reducer;
