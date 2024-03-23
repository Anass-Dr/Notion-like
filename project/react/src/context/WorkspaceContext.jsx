import { createContext, useState, useEffect } from "react";
import { headers } from "../config/fetch";
import { endpoint } from "../config/fetch";

export const WorkspaceContext = createContext(null);

export function WorkspaceContextProvider({ children }) {
    const [data, setData] = useState([]);

    // Side Effects :
    useEffect(() => {
        const fetchData = async () => {
            const id = JSON.parse(localStorage.getItem("user")).id;
            const res = await fetch(`${endpoint}/pages/${id}`, {
                method: "get",
                headers,
            });
            const result = await res.json();
            if (res.status == 200) setData(result.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const sendData = async () => {
            const page = data.filter((page) => page.active)[0];
            const obj = {
                page,
                user_id: JSON.parse(localStorage.getItem("user")).id,
            };
            const res = await fetch(`${endpoint}/pages/1`, {
                method: "put",
                headers,
                body: JSON.stringify(obj),
            });
            const result = await res.json();
            console.log(result);
        };
        sendData();
    }, [data]);

    // Methods :
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
