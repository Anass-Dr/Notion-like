import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Page from "./Page/Page";
import "./main.css";

function Workspace() {
    return (
        <div id="user">
            <div className="container">
                <Sidebar />
                <Header />
                <Page />
            </div>
        </div>
    );
}

export default Workspace;
