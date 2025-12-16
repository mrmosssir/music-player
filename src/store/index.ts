import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./Auth.model";
import DisplayReducer from "./Display.model";

export type RootState = {
  auth: ReturnType<typeof AuthReducer>;
  display: ReturnType<typeof DisplayReducer>;
};

export default configureStore({
  reducer: {
    auth: AuthReducer,
    display: DisplayReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
