import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "../../../components/NavItem";
import SidebarPage from "../../../components/SidebarPage";
import "./sidebar.css";
import SearchSelect from "../../../components/SearchSelect/SearchSelect";

function Sidebar({ data, handleNewPage, showSidebar, setSidebar }) {
    const [showTrashPrompt, setTrashPrompt] = useState(false);
    const nav = useNavigate();
    const sidebarRef = useRef();

    const changePage = () => handleNewPage();
    const handleTrashPrompt = () => setTrashPrompt((prev) => !prev);
    const hideSidebar = () => setSidebar(false);

    return (
        <>
            <div
                id="sidebar"
                className={`${showSidebar ? "" : "hide-sidebar"}`}
                ref={sidebarRef}
            >
                <div className="workspace">
                    <span id="icon">A</span>
                    <span>Anass&#39;s Notion</span>
                    <i onClick={hideSidebar} className="fa-solid fa-xmark"></i>
                </div>
                <ul className="head">
                    <NavItem title="Search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </NavItem>
                    <NavItem title="Inbox">
                        <i className="fa-solid fa-inbox"></i>
                    </NavItem>
                    <NavItem title="New page" action={changePage}>
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
                                {data.map((page, indx) => (
                                    <SidebarPage
                                        key={indx}
                                        id={page.id}
                                        title={page.title}
                                        active={page.active}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="footer">
                        <NavItem title="Trash" action={handleTrashPrompt}>
                            <i className="fa-regular fa-trash-can"></i>
                        </NavItem>
                        <NavItem title="Logout" action={() => nav("/logout")}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </NavItem>
                    </div>
                </div>
            </div>
            {showTrashPrompt && (
                <SearchSelect
                    cords={sidebarRef.current.getBoundingClientRect()}
                    showPrompt={setTrashPrompt}
                />
            )}
        </>
    );
}

export default Sidebar;
