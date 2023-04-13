import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { TermContextProvider } from "./context/termContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <DarkModeContextProvider>
            <AuthContextProvider>
                <TermContextProvider>
                    <App />
                </TermContextProvider>
            </AuthContextProvider>
        </DarkModeContextProvider>
    </React.StrictMode>
);
