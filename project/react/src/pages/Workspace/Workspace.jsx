import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Page from "./Page/Page";
import { WorkspaceContextProvider } from "../../context/WorkspaceContext";
import "./main.css";

function Workspace() {
    return (
        <div id="user">
            <div className="container">
                <WorkspaceContextProvider>
                    <Sidebar />
                    <Header />
                    <Page />
                </WorkspaceContextProvider>
            </div>
        </div>
    );
}

export default Workspace;
