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
        // fetchData();
    }, []);

    const handleNewPage = () => {
        setData([
            ...data.map((page) => ({ ...page, active: false })),
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

    const changeActivePage = (id) => {
        setData((prevItems) =>
            prevItems.map((page) =>
                page.id == id
                    ? { ...page, active: true }
                    : { ...page, active: false }
            )
        );
    };

    const saveChange = (key, value) => {
        setData((prevItems) =>
            prevItems.map((page) =>
                page.active ? { ...page, [key]: value } : page
            )
        );
    };

    return (
        <WorkspaceContext.Provider
            value={{
                data,
                handleNewPage,
                saveChange,
                changeActivePage,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
}
