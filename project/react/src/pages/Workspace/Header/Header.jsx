import { useContext } from "react";
import { WorkspaceContext } from "../../../context/WorkspaceContext";
import "./header.css";

function Header() {
    const { data } = useContext(WorkspaceContext);
    const currPage = data.filter((page) => page.active)[0];

    return (
        <header>
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
                <li>
                    <i className="fa-solid fa-ellipsis"></i>
                </li>
            </ul>
        </header>
    );
}

export default Header;
