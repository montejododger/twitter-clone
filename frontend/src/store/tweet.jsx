import jwtFetch from "./jwt";
import { createSelector } from "reselect";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_TWEETS = "tweets/RECEIVE_TWEETS";
const RECEIVE_USER_TWEETS = "tweets/RECEIVE_USER_TWEETS";
const RECEIVE_NEW_TWEET = "tweets/RECEIVE_NEW_TWEET";
const DELETE_USER_TWEET = "tweets/DELETE_USER_TWEET";
const RECEIVE_TWEET_ERRORS = "tweets/RECEIVE_TWEET_ERRORS";
const CLEAR_TWEET_ERRORS = "tweets/CLEAR_TWEET_ERRORS";

const receiveTweets = (tweets) => ({
    type: RECEIVE_TWEETS,
    tweets,
});

const receiveUserTweets = (tweets) => {
    return {
        type: RECEIVE_USER_TWEETS,
        tweets,
    };
};

const removeUserTweet = (tweetId, context) => {
    return {
        type: DELETE_USER_TWEET,
        payload: { tweetId, context },
    };
};

const receiveNewTweet = (tweet) => ({
    type: RECEIVE_NEW_TWEET,
    tweet,
});

const receiveErrors = (errors) => ({
    type: RECEIVE_TWEET_ERRORS,
    errors,
});

export const clearTweetErrors = (errors) => ({
    type: CLEAR_TWEET_ERRORS,
    errors,
});

export const fetchTweets = () => async (dispatch) => {
    try {
        const res = await jwtFetch("/api/tweets");
        const tweets = await res.json();
        dispatch(receiveTweets(tweets));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchUserTweets = (id) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/tweets/user/${id}`);
        const tweets = await res.json();
        dispatch(receiveUserTweets(tweets));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const composeTweet = (data) => async (dispatch) => {
    try {
        const res = await jwtFetch("/api/tweets/", {
            method: "POST",
            body: JSON.stringify(data),
        });
        const tweet = await res.json();
        dispatch(receiveNewTweet(tweet));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const deleteUserTweet = (id, context) => async (dispatch) => {
    const res = await jwtFetch(`/api/tweets/${id}`, {
        method: "DELETE",
    });

    if (res.ok) dispatch(removeUserTweet(id, context));
};

const nullErrors = null;

export const tweetErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_TWEET_ERRORS:
            return action.errors;
        case RECEIVE_NEW_TWEET:
        case CLEAR_TWEET_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const initialState = {
    all: {},
    user: {},
    new: null,
};

const tweetsReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState;

    switch (action.type) {
        case RECEIVE_TWEETS:
            return { ...state, all: action.tweets, new: undefined };
        case RECEIVE_USER_TWEETS:
            return { ...state, user: action.tweets, new: undefined };
        case RECEIVE_NEW_TWEET:
            return {
                ...state,
                new: action.tweet,
            };
        case DELETE_USER_TWEET:
            const { tweetId, context } = action.payload;
            const newState = { ...state };

            // UPDATE DIFFERENT PIECES OF STATE DEPENDING ON CONTEXT
            if (context === "ALL") {
                newState.all = state.all.filter(
                    (tweet) => tweet._id !== tweetId
                );
            }

            if (context === "USER") {
                newState.user = state.user.filter(
                    (tweet) => tweet._id !== tweetId
                );
            }
            if (context === "NEW") {
                if (newState.new && newState.new._id === tweetId) {
                    newState.new = null;
                }
            }

            return newState;
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: {}, new: undefined };
        default:
            return state;
    }
};

export const selectUserTweets = createSelector(
    [(state) => state.tweets.user],
    (userTweets) => Object.values(userTweets)
);

export const allTweets = createSelector(
    [(state) => state.tweets.all], // Input selectors
    (tweets) => Object.values(tweets) // Output selector
);
export default tweetsReducer;
