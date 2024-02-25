import { createContext, useContext, useState, useEffect } from "react";

const PageDataContext = createContext();

export default PageDataContext;

export const usePageData = () => useContext(PageDataContext);

export const PageDataProvider = ({ children }) => {
    const [pageData, setPageData] = useState(() => {
        if (typeof window !== "undefined") {
            // Try to get the pageData from local storage
            const storedPageData = sessionStorage.getItem("pageData");
            return storedPageData ? JSON.parse(storedPageData) : null;
        }
        return null;
    });

    useEffect(() => {
        // Whenever the pageData state changes, update local storage
        if (pageData && typeof window !== "undefined") {
            sessionStorage.setItem("pageData", JSON.stringify(pageData));
        } else if (typeof window !== "undefined") {
            sessionStorage.removeItem("pageData");
        }
    }, [pageData]);

    return (
        <PageDataContext.Provider value={{ pageData, setPageData }}>
            {children}
        </PageDataContext.Provider>
    );
};
