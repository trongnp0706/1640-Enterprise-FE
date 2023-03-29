import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));
    console.log(currentUser)
    const login = async (inputs) => {
        const res = await axios.post(
            "http://localhost:1313/login",
            inputs,
            {
                withCredentials: true,
            }
        );
        setCurrentUser(res.data);

        localStorage.setItem("user", JSON.stringify(res.data));
    };

    const logout = async (inputs) => {
        await axios.get("http://localhost:1313/logout");
        setCurrentUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
