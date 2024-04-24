import { createContext, useState } from "react";

export const ToasterContext = createContext("not working");

export function ToasterContextProvider({ children }) {
    const [data, setData] = useState({ type: "", content: "" });

    const add = (type, content) => setData({ type, content });
    const reset = () => setData({ type: "", content: "" });

    return (
        <ToasterContext.Provider value={{ data, add, reset }}>
            {children}
        </ToasterContext.Provider>
    );
}
