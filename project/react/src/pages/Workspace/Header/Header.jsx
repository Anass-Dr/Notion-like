import { useState, useRef, useEffect } from "react";
import { endpoint, headers } from "../../../config/fetch";
import PageOptions from "../../../components/PageOptions";
import ShareToolbar from "../../../components/ShareToolbar/ShareToolbar";
import "./header.css";

function Header({ showSidebar, currPage, deletePage }) {
    const [showOptions, setOptions] = useState(false);
    const [showShareOptions, setShareOptions] = useState(false);
    const [pagetoken, setPageToken] = useState("");
    const headerRef = useRef(null);

    const handleDelete = () => {
        deletePage(currPage.id);
        setOptions(false);
    };

    useEffect(() => {
        const checkPublicPage = async () => {
            const res = await fetch(
                `${endpoint}/public-pages/id/${currPage.id}`,
                {
                    method: "get",
                    headers: headers(),
                }
            );
            const result = await res.json();
            if (res.ok) setPageToken(result.token);
        };
        checkPublicPage();
    }, [currPage]);

    const handleShare = () => setShareOptions((prev) => !prev);
    const handlePublish = async () => {
        const res = await fetch(`${endpoint}/public-pages/${currPage.id}`, {
            method: "post",
            headers: headers(),
        });
        const result = await res.json();
        if (res.ok) setPageToken(result.token);
    };
    const handleUnpublish = async () => {
        const res = await fetch(`${endpoint}/public-pages/${pagetoken}`, {
            method: "DELETE",
            headers: headers(),
        });
        if (res.status === 204) setPageToken("");
    };

    return (
        <>
            <header ref={headerRef}>
                {showOptions && (
                    <PageOptions
                        setOptions={setOptions}
                        handleDelete={handleDelete}
                    />
                )}
                <div onClick={() => showSidebar(true)} className="header_bar">
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className="title">
                    <img src="" />
                    <span>{currPage.title}</span>
                </div>
                <ul id="options">
                    <li onClick={handleShare}>Share</li>
                    <li className="header_icons">
                        <i className="fa-regular fa-message"></i>
                    </li>
                    <li className="header_icons">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                    </li>
                    <li className="header_icons">
                        <i className="fa-regular fa-star"></i>
                    </li>
                    <li onClick={() => setOptions((prev) => !prev)}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </li>
                </ul>
            </header>
            {showShareOptions && (
                <ShareToolbar
                    token={pagetoken}
                    setToolbar={handleShare}
                    cords={headerRef.current.getBoundingClientRect()}
                    handlePublish={handlePublish}
                    handleUnpublish={handleUnpublish}
                />
            )}
        </>
    );
}

export default Header;
