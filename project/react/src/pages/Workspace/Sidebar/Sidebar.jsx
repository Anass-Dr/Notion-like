import NavItem from "../../../components/NavItem";
import SidebarPage from "../../../components/SidebarPage";
import "./sidebar.css";

function Sidebar() {
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
                        <ul>
                            <SidebarPage title="Caching" />
                            <SidebarPage title="Learning C" />
                        </ul>
                    </div>
                    <div className="private">
                        <span className="group_page">Private</span>
                        <ul>
                            <SidebarPage title="Full Stack Developer" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
                            <SidebarPage title="Password Manager" />
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
