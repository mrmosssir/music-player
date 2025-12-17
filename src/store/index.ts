import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./auth";
import CommonReducer from "./common";

export type RootState = {
  auth: ReturnType<typeof AuthReducer>;
  common: ReturnType<typeof CommonReducer>;
};

export default configureStore({
  reducer: {
    auth: AuthReducer,
    common: CommonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
