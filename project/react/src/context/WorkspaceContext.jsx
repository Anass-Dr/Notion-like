import { createContext, useState, useEffect } from "react";
import { endpoint, headers } from "../config/fetch";

export const WorkspaceContext = createContext(null);

export function WorkspaceContextProvider({ children }) {
    const [data, setData] = useState([]);

    // Side Effects :
    useEffect(() => {
        const fetchData = async () => {
            const id = JSON.parse(localStorage.getItem("user")).id;
            const res = await fetch(`${endpoint}/pages/${id}`, {
                method: "get",
                headers: headers(),
            });
            const result = await res.json();
            if (res.status == 200) setData(result.data);
        };
        fetchData();
    }, []);

    // Methods :
    const handleNewPage = async () => {
        const res = await fetch(`${endpoint}/pages`, {
            method: "post",
            headers: headers(),
            body: JSON.stringify({
                user_id: JSON.parse(localStorage.getItem("user")).id,
            }),
        });
        const result = await res.json();
        if (res.status === 201)
            setData([
                ...data.map((page) => ({ ...page, active: false })),
                result.data.page,
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

    const sendData = async (page) => {
        const obj = {
            page,
            user_id: JSON.parse(localStorage.getItem("user")).id,
        };
        const res = await fetch(`${endpoint}/pages/${page.id}`, {
            method: "put",
            headers: headers(),
            body: JSON.stringify(obj),
        });
    };

    const saveChange = (key, value) => {
        const pageObj = {
            ...data.filter((page) => page.active)[0],
            [key]: value,
        };
        setData((prevItems) =>
            prevItems.map((page) => (page.active ? pageObj : page))
        );
        sendData(pageObj);
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
