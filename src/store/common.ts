import { createSlice } from "@reduxjs/toolkit";

type EnabledKeys = "mask" | "playlist" | "search";

export const DisplaySlice = createSlice({
  name: "Display",
  initialState: {
    enabled: {
      mask: false,
      playlist: false,
      search: false,
    },
  },
  reducers: {
    setEnabled: {
      reducer: (state, action: { payload: { key: keyof typeof state.enabled; status: boolean } }) => {
        state.enabled[action.payload.key] = action.payload.status;
      },
      prepare: (key: EnabledKeys, status: boolean) => {
        return { payload: { key, status } };
      },
    },
  },
});

export const { setEnabled } = DisplaySlice.actions;

export default DisplaySlice.reducer;
