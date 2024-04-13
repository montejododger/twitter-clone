import "./TweetBox.css";
import { useDispatch } from "react-redux";
import { deleteUserTweet } from "../../store/tweet";

function TweetBox({ tweet: { text, author, _id }, currentUser, source }) {

    // debugger
    const { username } = author;
    const dispatch = useDispatch();



    const handleSubmit = (e) => {
        // debugger
        e.preventDefault();
        dispatch(deleteUserTweet(_id, source));
    };

    // console.log(currentUser);
    // console.log(_id);

    // debugger

    return (
        <div className="tweet">
            <h3>{username}</h3>
            <p>{text}</p>
            {currentUser._id === author._id && (
                <button onClick={handleSubmit}>Delete</button>
            )}
        </div>
    );
}

export default TweetBox;
