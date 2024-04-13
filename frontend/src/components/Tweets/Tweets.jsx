import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTweetErrors, fetchTweets, allTweets } from "../../store/tweet";
import TweetBox from "./TweetBox";

function Tweets() {
    const dispatch = useDispatch();
    const tweets = useSelector(allTweets);
    const currentUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(fetchTweets());
        return () => dispatch(clearTweetErrors());
    }, [dispatch]);

    if (tweets.length === 0) return <div>There are no Tweets</div>;

    // console.log(currentUser);
    return (
        <>
            <h2>All Tweets</h2>
            {tweets.map((tweet) => (
                <TweetBox
                    key={tweet._id}
                    tweet={tweet}
                    currentUser={currentUser}
                    source="ALL"
                />
            ))}
        </>
    );
}

export default Tweets;
