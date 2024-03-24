import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WorkspaceContext } from "../context/WorkspaceContext";
import "./nav-item.css";

function NavItem({ title, children }) {
    const nav = useNavigate();
    const { handleNewPage } = useContext(WorkspaceContext);

    const handleClick = () => {
        if (title === "New page") handleNewPage();
        if (title === "Logout") nav("/logout");
    };

    return (
        <li onClick={handleClick} className="nav-item">
            {children}
            <span>{title}</span>
        </li>
    );
}

export default NavItem;
