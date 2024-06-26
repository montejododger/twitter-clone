import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTweetErrors, composeTweet } from "../../store/tweet";
import TweetBox from "./TweetBox";
import "./TweetCompose.css";

function TweetCompose() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const author = useSelector((state) => state.session.user);
    const newTweet = useSelector((state) => state.tweets.new);
    const errors = useSelector((state) => state.errors.tweets);

    useEffect(() => {
        return () => dispatch(clearTweetErrors());
    }, [newTweet, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(composeTweet({ text }));
        setText("");
    };

    const update = (e) => setText(e.currentTarget.value);

    // debugger

    return (
        <>
            <form className="compose-tweet" onSubmit={handleSubmit}>
                <input
                    type="textarea"
                    value={text}
                    onChange={update}
                    placeholder="Write your tweet..."
                    required
                />
                <div className="errors">{errors?.text}</div>
                <input type="submit" value="Submit" />
            </form>
            <div className="tweet-preview">
                <h3>Tweet Preview</h3>
                {text ? (
                    <TweetBox tweet={{ text, author }} currentUser={author} />
                ) : undefined}
            </div>
            <div className="previous-tweet">
                <h3>Previous Tweet</h3>
                {newTweet ? (
                    <TweetBox
                        tweet={newTweet}
                        currentUser={author}
                        source="NEW"
                    />
                ) : undefined}
            </div>
        </>
    );
}

export default TweetCompose;
