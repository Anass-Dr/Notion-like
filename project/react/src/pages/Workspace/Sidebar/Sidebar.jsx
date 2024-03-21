import { useContext } from "react";
import { WorkspaceContext } from "../../../context/WorkspaceContext";
import NavItem from "../../../components/NavItem";
import SidebarPage from "../../../components/SidebarPage";
import "./sidebar.css";

function Sidebar() {
    const { data } = useContext(WorkspaceContext);

    return (
        <div id="sidebar">
            <div className="workspace">
                <span id="icon">A</span>
                <span>Anass&#39;s Notion</span>
            </div>
            <ul className="head">
                <NavItem title="Search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </NavItem>
                <NavItem title="Inbox">
                    <i className="fa-solid fa-inbox"></i>
                </NavItem>
                <NavItem title="New page">
                    <i className="fa-solid fa-circle-plus"></i>
                </NavItem>
            </ul>
            <div className="nav">
                <div className="pages">
                    <div className="shared">
                        <span className="group_page">Shared</span>
                        <ul></ul>
                    </div>
                    <div className="private">
                        <span className="group_page">Private</span>
                        <ul>
                            {data.map((page) => (
                                <SidebarPage key={page.id} title={page.title} />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="footer">
                    <NavItem title="Trash">
                        <i className="fa-regular fa-trash-can"></i>
                    </NavItem>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
