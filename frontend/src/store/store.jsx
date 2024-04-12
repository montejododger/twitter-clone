import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import sessionReducer from "./session.jsx";
import tweetsReducer from "./tweet.jsx";
import errorsReducer from "./errors.jsx";

const reducer = {
    session: sessionReducer,
    tweets: tweetsReducer,
    errors: errorsReducer,
};

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
