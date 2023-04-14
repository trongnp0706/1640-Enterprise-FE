import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { TermContextProvider } from "./context/termContext";
import { PageContextProvider } from "./context/pageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <DarkModeContextProvider>
            <AuthContextProvider>
                    <TermContextProvider>
                        <PageContextProvider>
                        <App />
                        </PageContextProvider>
                    </TermContextProvider>
            </AuthContextProvider>
        </DarkModeContextProvider>
    </React.StrictMode>
);
