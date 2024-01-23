import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./Auth.model";
import DisplayReducer from "./Display.model";

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
