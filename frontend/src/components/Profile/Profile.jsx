import { useEffect, useMemo } from "react";
import { createSelector } from "reselect";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserTweets, clearTweetErrors } from "../../store/tweet";

import TweetBox from "../Tweets/TweetBox";

const selectUserTweets = (state) => state.tweets.user[0];
const tweets = createSelector([selectUserTweets], (tweets) =>
    Object.values(tweets)
);

function Profile() {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.session.user);
    const userTweets = createSelector(tweets);

    console.log(userTweets);
    useEffect(() => {
        dispatch(fetchUserTweets(currentUser._id));
        return () => dispatch(clearTweetErrors());
    }, [currentUser, dispatch]);

    if (userTweets.length === 0) {
        return <div>{currentUser.username} has no Tweets</div>;
    } else {
        return (
            <>
                <h2>All of {currentUser.username}'s Tweets</h2>
                {userTweets.map((tweet) => (
                    <TweetBox key={tweet._id} tweet={tweet} />
                ))}
            </>
        );
    }
}

export default Profile;
