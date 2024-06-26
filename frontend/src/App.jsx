import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";

import NavBar from "./components/NavBar/NavBar";

import MainPage from "./components/MainPage/MainPage.jsx";

import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";

import Tweets from "./components/Tweets/Tweets";
import Profile from "./components/Profile/Profile";
import TweetCompose from "./components/Tweets/TweetCompose";

import { getCurrentUser } from "./store/session.jsx";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        // if (!token)
        dispatch(getCurrentUser()).then(() => setLoaded(true));
    }, [dispatch]);

    return (
        loaded && (
            <>
                <NavBar />
                <Switch>
                    <AuthRoute exact path="/" component={MainPage} />
                    <AuthRoute exact path="/login" component={LoginForm} />
                    <AuthRoute exact path="/signup" component={SignupForm} />

                    <ProtectedRoute exact path="/tweets" component={Tweets} />
                    <ProtectedRoute exact path="/profile" component={Profile} />
                    <ProtectedRoute
                        exact
                        path="/tweets/new"
                        component={TweetCompose}
                    />
                </Switch>
            </>
        )
    );
}

export default App;
