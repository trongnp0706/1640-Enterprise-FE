import { createContext, useEffect, useState } from "react";

export const PageContext = createContext();
export const PageContextProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </PageContext.Provider>
    );
}