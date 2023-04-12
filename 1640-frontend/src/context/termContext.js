import { createContext, useEffect, useState } from "react";

export const TermContext = createContext();
export const TermContextProvider = ({ children }) => {
    const [termConfirm, setTermConfirm] = useState(false);
    return (
        <TermContext.Provider value={{ termConfirm, setTermConfirm }}>
            {children}
        </TermContext.Provider>
    );
}