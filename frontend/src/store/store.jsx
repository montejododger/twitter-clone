import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import sessionReducer from "./session.jsx";
import { sessionErrorsReducer } from "./session.jsx";

const reducer = {
    session: sessionReducer,
    sessionErrorsReducer,
};

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
