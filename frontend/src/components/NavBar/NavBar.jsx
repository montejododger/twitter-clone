import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/session";

function NavBar() {
    const loggedIn = useSelector((state) => !!state.session.user);
    const dispatch = useDispatch();

    const logoutUser = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="flex flex-row">
                    <Link className="basis-1/4 text-center" to={"/tweets"}>
                        All Tweets
                    </Link>
                    <Link className="basis-1/4 text-center" to={"/profile"}>
                        Profile
                    </Link>
                    <Link className="basis-1/4 text-center" to={"/tweets/new"}>
                        Write a Tweet
                    </Link>
                    <button
                        className="basis-1/4 text-center"
                        onClick={logoutUser}
                    >
                        Logout
                    </button>
                </div>
            );
        } else {
            return (
                <div className="links-auth">
                    <Link to={"/signup"}>Signup</Link>
                    <Link to={"/login"}>Login</Link>
                </div>
            );
        }
    };

    return (
        <>
            <h1>Chirper</h1>
            {getLinks()}
        </>
    );
}

export default NavBar;
