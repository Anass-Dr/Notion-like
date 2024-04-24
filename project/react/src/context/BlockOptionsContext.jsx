import { useState, createContext } from "react";

export const BlockOptionsContext = createContext(null);

export function BlockOptionsContextProvider({ children }) {
    const [options, setOptions] = useState({});

    const handleOptions = (onHover, cords = options.cords, blockId = null) => {
        setOptions({ show: onHover, cords, blockId });
    };

    return (
        <BlockOptionsContext.Provider value={{ options, handleOptions }}>
            {children}
        </BlockOptionsContext.Provider>
    );
}
