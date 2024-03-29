import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./Auth.model";
import DisplayReducer from "./Display.model";
import PlayListReducer from "./PlayList.model";

export default configureStore({
    reducer: {
        auth: AuthReducer,
        display: DisplayReducer,
        playList: PlayListReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
