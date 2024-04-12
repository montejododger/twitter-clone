import { useEffect } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { clearTweetErrors, fetchTweets } from "../../store/tweet";
import TweetBox from "./TweetBox";

const selectTweetsState = (state) => state.tweets.all;
const tweets = createSelector(
    [selectTweetsState], // Input selectors
    (tweets) => Object.values(tweets) // Output selector
);

function Tweets() {
    const dispatch = useDispatch();
    const allTweets = useSelector(tweets);

    useEffect(() => {
        dispatch(fetchTweets());
        return () => dispatch(clearTweetErrors());
    }, [dispatch]);

    if (allTweets.length === 0) return <div>There are no Tweets</div>;

    return (
        <>
            <h2>All Tweets</h2>
            {allTweets.map((tweet) => (
                <TweetBox key={tweet._id} tweet={tweet} />
            ))}
        </>
    );
}

export default Tweets;
