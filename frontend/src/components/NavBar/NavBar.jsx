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
            <nav className="bg-gray-500">
                <div className="">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <h1 className="text-white text-4xl text-center tracking-wider">
                            Twitter
                        </h1>
                        <div className="relative flex h-16 items-center justify-between font-bold m-2">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <button
                                    onClick={toggleOpen}
                                    type="button"
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-white"
                                >
                                    <span className="absolute -inset-0.5"></span>
                                    <svg
                                        className={
                                            isOpen ? "hidden" : "block size-6"
                                        } // Correct class names assuming Tailwind CSS
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        />
                                    </svg>
                                    <svg
                                        className={
                                            isOpen ? "block size-6" : "hidden"
                                        } // Correct class names and ensure the svg is always visible when isOpen is false
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
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
                            </div>
                            <div className={"hidden sm:ml-6 sm:block"}>
                                <div className="flex space-x-4">
                                    <a
                                        href="/tweets"
                                        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        All Tweets
                                    </a>
                                    <a
                                        href="/profile"
                                        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="/tweets/new"
                                        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        Write a Tweet
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            class={isOpen ? "sm:hidden" : "hidden"}
                            id="mobile-menu"
                        >
                            <div class="space-y-1 px-2 pb-3 pt-2">
                                <a
                                    href="/tweets"
                                    class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                                    aria-current="page"
                                >
                                    All Tweets
                                </a>
                                <a
                                    href="/profile"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                                >
                                    Profile
                                </a>
                                <a
                                    href="/tweets/new"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                                >
                                    Write A Tweet
                                </a>
                            </div>
                        </div>

                        {getLinks()}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
