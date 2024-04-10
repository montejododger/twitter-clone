// import ReactDOM from "react-dom/client";
// import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";


function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}


const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<Root />);
} else {
    console.error("Failed to find the root element");
}
