import { useContext, useState } from "react";
import { WorkspaceContext } from "../../../context/WorkspaceContext";
import PageOptions from "../../../components/PageOptions";
import "./header.css";

function Header() {
    const [showOptions, setOptions] = useState(false);
    const { data, deletePage } = useContext(WorkspaceContext);
    const currPage = data.filter((page) => page.active)[0];

    const handleDelete = () => {
        deletePage(currPage.id);
        setOptions(false);
    }

    return (
        <header>
            {showOptions && (
                <PageOptions
                    setOptions={setOptions}
                    handleDelete={handleDelete}
                />
            )}
            <div className="title">
                <img src="" />
                <span>{currPage.title}</span>
            </div>
            <ul id="options">
                <li>Share</li>
                <li>
                    <i className="fa-regular fa-message"></i>
                </li>
                <li>
                    <i className="fa-solid fa-clock-rotate-left"></i>
                </li>
                <li>
                    <i className="fa-regular fa-star"></i>
                </li>
                <li onClick={() => setOptions((prev) => !prev)}>
                    <i className="fa-solid fa-ellipsis"></i>
                </li>
            </ul>
        </header>
    );
}

export default Header;
