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
            <h2 className="flex justify-center font-bold font">All Tweets</h2>
            <div className="">
                {tweets.map((tweet) => (
                    <TweetBox
                        key={tweet._id}
                        tweet={tweet}
                        currentUser={currentUser}
                        source="ALL"
                    />
                ))}
            </div>
        </>
    );
}

export default Tweets;
