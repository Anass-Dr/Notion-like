import { createContext, useState, useEffect } from "react";
import { endpoint, headers } from "../config/fetch";

export const WorkspaceContext = createContext(null);

export function WorkspaceContextProvider({ children }) {
    const [data, setData] = useState([]);

    // Side Effects :
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${endpoint}/pages`, {
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
        });
        const result = await res.json();
        if (res.status === 201)
            setData([
                ...data.map((page) => ({ ...page, active: false })),
                result.data.page,
            ]);
    };

    const changeActivePage = async (id) => {
        setData((prevItems) =>
            prevItems.map((page) =>
                page.id == id
                    ? { ...page, active: true }
                    : { ...page, active: false }
            )
        );

        const res = await fetch(`${endpoint}/pages/${id}`, {
            method: "POST",
            headers: headers(),
        });
    };

    const sendData = async (page) => {
        const res = await fetch(`${endpoint}/pages/${page.id}`, {
            method: "put",
            headers: headers(),
            body: JSON.stringify(page),
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

    const deletePage = async (id) => {
        const newState = data
            .filter((page) => page.id != id)
            .map((page, indx) =>
                indx === 0
                    ? { ...page, active: true }
                    : { ...page, active: false }
            );
        setData(newState);

        const res = await fetch(`${endpoint}/pages/${id}`, {
            method: "DELETE",
            headers: headers(),
            body: JSON.stringify({ active_id: newState[0].id }),
        });
    };

    return (
        <WorkspaceContext.Provider
            value={{
                data,
                handleNewPage,
                saveChange,
                changeActivePage,
                deletePage,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
}
