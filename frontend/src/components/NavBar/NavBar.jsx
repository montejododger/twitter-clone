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
                        Compose
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
                                    }
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
                            <div className={"hidden sm:ml-6 sm:block"}>
                                <div className="flex space-x-4">
                                    <a
                                        href="/tweets"
                                        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white"
                                    >
                                        All Tweets
                                    </a>
                                    <a
                                        href="/profile"
                                        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white"
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="/tweets/new"
                                        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white"
                                    >
                                        Compose
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div clasName="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5"></span>

                                <svg
                                    className="size-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                            </button>
                            <div className="relative ml-3">
                                <button
                                    type="button"
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>

                        <div
                            className={isOpen ? "sm:hidden" : "hidden"}
                            id="mobile-menu"
                        >
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                <a
                                    href="/tweets"
                                    className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                                    aria-current="page"
                                >
                                    All Tweets
                                </a>
                                <a
                                    href="/profile"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                                >
                                    Profile
                                </a>
                                <a
                                    href="/tweets/new"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                                >
                                    Compose
                                </a>
                            </div>
                        </div>
                        {/* {getLinks()} */}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
