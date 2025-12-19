import { configureStore } from "@reduxjs/toolkit";

import CommonReducer from "./common";
import AuthReducer from "./auth";
import MusicReducer from "./music";

export type RootState = {
  common: ReturnType<typeof CommonReducer>;
  auth: ReturnType<typeof AuthReducer>;
  music: ReturnType<typeof MusicReducer>;
};

export default configureStore({
  reducer: {
    common: CommonReducer,
    auth: AuthReducer,
    music: MusicReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
