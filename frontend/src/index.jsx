import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./store/store.jsx";

function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}

const RenderApplication = () => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(
            <StrictMode>
                <Root />
            </StrictMode>
        );
    } else {
        console.error("Failed to find the root element");
    }
};

RenderApplication();
