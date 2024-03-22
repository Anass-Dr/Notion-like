import { useContext } from "react";
import { WorkspaceContext } from "../context/WorkspaceContext";
import { useState, useRef } from "react";
import { headers } from "../config/fetchHeaders";
import "./page-image.css";

export default function PageImage({ id, src }) {
    const { handlePageCover } = useContext(WorkspaceContext);
    const [onHover, setOnHover] = useState(false);
    const [showToolbar, setShowToolbar] = useState(false);

    const handleCover = async (type, src) => {
        const data = {
            target: "background",
            type,
            src,
        };
        const res = await fetch("http://127.0.0.1:8000/api/pages/1", {
            method: "put",
            headers,
            body: JSON.stringify(data),
        });
        const message = await res.json();
        handlePageCover(id, src);
    };

    return (
        <div
            style={{ backgroundImage: `url(${src})` }}
            onMouseOver={() => setOnHover(true)}
            onMouseOut={() => setOnHover(false)}
            className="background"
        >
            {onHover && (
                <div className="cover__options">
                    <span onClick={() => setShowToolbar(true)}>
                        Change cover
                    </span>
                </div>
            )}
            {showToolbar && (
                <CoverToolbar
                    setShowToolbar={setShowToolbar}
                    setOnHover={setOnHover}
                    handleCover={handleCover}
                />
            )}
        </div>
    );
}

function CoverToolbar({ setShowToolbar, setOnHover, handleCover }) {
    const [tab, setTab] = useState(1);
    const linkInputRef = useRef(null);

    const handleClick = () => {
        setOnHover(false);
        setShowToolbar(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = linkInputRef.current.value;
        setOnHover(false);
        setShowToolbar(false);
        handleCover("link", url);
    };

    return (
        <div className="cover__toolbar">
            <div className="offset" onClick={handleClick}></div>
            <div className="toolbar">
                <header>
                    <ul>
                        <li
                            onClick={() => setTab(1)}
                            className={`toolbar__li ${
                                tab == 1 ? "active" : ""
                            }`}
                        >
                            Upload
                        </li>
                        <li
                            onClick={() => setTab(2)}
                            className={`toolbar__li ${
                                tab == 2 ? "active" : ""
                            }`}
                        >
                            Link
                        </li>
                        <li className="toolbar__li">Remove</li>
                    </ul>
                </header>
                <main>
                    {tab == 1 ? (
                        <div className="upload">
                            <label className="upload__label" htmlFor="cover">
                                Upload file
                                <input
                                    type="file"
                                    name="upload__cover"
                                    id="upload__cover"
                                />
                            </label>
                            <span>
                                Images wider than 1500 pixels work best.
                            </span>
                            <span>The maximum size per file is 5 MB.</span>
                        </div>
                    ) : (
                        <div className="link">
                            <form onSubmit={handleSubmit}>
                                <input
                                    ref={linkInputRef}
                                    type="search"
                                    name="link__cover"
                                    id="link__cover"
                                />
                                <button type="submit" className="link__btn">
                                    Submit
                                </button>
                            </form>
                            <span>Works with any image from the web.</span>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
