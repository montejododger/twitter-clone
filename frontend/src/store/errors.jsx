import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session";
import { tweetErrorsReducer } from "./tweet";

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    tweet: tweetErrorsReducer,
});

export default errorsReducer;
