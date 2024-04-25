import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endpoint, headers } from "../config/fetch";

export const WorkspaceContext = createContext(null);

export function WorkspaceContextProvider({ children }) {
    const [data, setData] = useState([]);
    const [trashItems, setTrashItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    // Side Effects :
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${endpoint}/pages`, {
                method: "get",
                headers: headers(),
            });
            const result = await res.json();
            if (res.status == 200) setData(result.data);
            else nav("/login");
        };
        fetchData();
    }, [trashItems, nav]);

    useEffect(() => {
        const getTrashData = async () => {
            const res = await fetch(`${endpoint}/pages/trash`, {
                method: "GET",
                headers: headers(),
            });
            const result = await res.json();
            if (res.status == 200) setTrashItems(result.data);
            else nav("/login");
            setLoading(false);
        };
        getTrashData();
    }, [nav]);

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
        setTrashItems((prev) => [
            ...prev,
            { id, title: data.filter((page) => page.id == id)[0].title },
        ]);
    };

    const handlePageRestore = async (id) => {
        const res = await fetch(`${endpoint}/pages/restore/${id}`, {
            method: "GET",
            headers: headers(),
        });
        if (res.status == 200)
            setTrashItems((prev) => prev.filter((page) => page.id != id));
    };

    const handlePageDelete = async (id) => {
        const res = await fetch(`${endpoint}/pages/delete/${id}`, {
            method: "DELETE",
            headers: headers(),
        });
        if (res.status == 204)
            setTrashItems((prev) => prev.filter((page) => page.id != id));
    };

    return (
        <WorkspaceContext.Provider
            value={{
                data,
                trashItems,
                loading,
                handleNewPage,
                saveChange,
                changeActivePage,
                deletePage,
                handlePageRestore,
                handlePageDelete,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
}
