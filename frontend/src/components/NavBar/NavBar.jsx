import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/session";

function NavBar() {
    const loggedIn = useSelector((state) => !!state.session.user);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const logoutUser = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="flex flex-row text-center">
                    <Link className="basis-1/4" to={"/tweets"}>
                        All Tweets
                    </Link>
                    <Link className="basis-1/4" to={"/profile"}>
                        Profile
                    </Link>
                    <Link className="basis-1/4" to={"/tweets/new"}>
                        Write a Tweet
                    </Link>
                    <button className="basis-1/4" onClick={logoutUser}>
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

    /*
create a background div
create a div to auto margin and padd for diff screen sizes also set the max width


    */
    return (
        <>
            <div className="bg-gray-500 ">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <h1 className="text-white text-4xl text-center tracking-wider">
                        Twitter
                    </h1>
                    <div className="relative flex h-16 items-center justify-between font-bold">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                onClick={toggleOpen}
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-white"
                            >
                                <span className="absolute -inset-0.5"></span>
                                <svg
                                    class="size-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <svg
                                    class="hidden h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
                                    alt=""
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a href=""></a>
                                    <a href=""></a>
                                    <a href=""></a>
                                    <a href=""></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {getLinks()}
            </div>
        </>
    );
}

export default NavBar;
