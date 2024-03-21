import { createContext, useState, useEffect } from "react";
import { headers } from "../config/fetchHeaders";

export const WorkspaceContext = createContext(null);

export function WorkspaceContextProvider({ children }) {
    const [data, setData] = useState([
        {
            id: 1,
            title: "Untitled",
            icon: "",
            cover: "",
            active: true,
            blocks: [],
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://127.0.0.1:8000/api/pages", {
                method: "get",
                headers,
            });
            const data = await res.json();
            if (res.status == 200) setData(data);
        };
        fetchData();
    }, []);

    const handleNewPage = () => {
        setData([
            ...data,
            {
                id: data.length + 1,
                title: "Untitled",
                icon: "",
                cover: "",
                active: true,
                blocks: [],
            },
        ]);
    };

    const saveChange = (key, value) => {
        const index = data.findIndex((page) => page.active);
        const pages = data;
        pages[index] = { ...pages[index], [key]: value };
        setData(pages);
    };

    return (
        <WorkspaceContext.Provider value={{ data, handleNewPage, saveChange }}>
            {children}
        </WorkspaceContext.Provider>
    );
}
