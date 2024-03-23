import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Page from "./Page/Page";
import { WorkspaceContextProvider } from "../../context/WorkspaceContext";
import Wrapper from "../../Wrapper";
import "./main.css";

function Workspace() {
    const { username } = useParams();
    return (
        <div id="user">
            <div className="container">
                <WorkspaceContextProvider>
                    <Wrapper>
                        <Sidebar />
                        <Header />
                        <Page />
                    </Wrapper>
                </WorkspaceContextProvider>
            </div>
        </div>
    );
}

export default Workspace;
