import { useContext } from "react";
import { WorkspaceContext } from "../context/WorkspaceContext";
import "./nav-item.css";

function NavItem({ title, children }) {
    const { handleNewPage } = useContext(WorkspaceContext);

    const handleClick = () => {
        if (title === "New page") handleNewPage();
    };

    return (
        <li onClick={handleClick} className="nav-item">
            {children}
            <span>{title}</span>
        </li>
    );
}

export default NavItem;
