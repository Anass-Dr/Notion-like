import { useState, useRef } from "react";
import "./FileToolbar.css";

function FileToolbar({ cords, setToolbar, handleFile }) {
    const [tab, setTab] = useState(1);
    const linkInputRef = useRef(null);

    const styles = {
        top: cords.bottom,
        left: cords.right - cords.left,
        transform: "translateX(-50%)",
    };

    const handleClick = () => {
        setToolbar(false);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        handleFile("upload", file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = linkInputRef.current.value;
        setToolbar(false);
        handleFile("link", url);
    };

    return (
        <div className="file__toolbar">
            <div className="offset" onClick={handleClick}></div>
            <div className="toolbar" style={styles}>
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
                            <label className="upload__label" htmlFor="file">
                                Upload file
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={handleUpload}
                                />
                            </label>
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
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default FileToolbar;
