import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Page from "./Page/Page";
import Wrapper from "../../Wrapper";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import Authorize from "../../helpers/Authorization";
import "./main.css";

function Workspace() {
    const [showSidebar, setSidebar] = useState(false);
    const auth = useContext(AuthContext);
    const workspace = useContext(WorkspaceContext);
    const currPage = workspace.data.filter((page) => page.active)[0];
    const params = useParams();
    const nav = useNavigate();

    if (auth.loading || workspace.loading) return <Loading />;
    
    const authorize = new Authorize(auth, params, workspace.data, nav, workspace.changeActivePage);
    authorize.handle();

    return (
        <div id="user">
            <div className="container">
                <Wrapper>
                    <Sidebar
                        data={workspace.data}
                        handleNewPage={workspace.handleNewPage}
                        showSidebar={showSidebar}
                        setSidebar={setSidebar}
                    />
                    <Header
                        currPage={currPage}
                        deletePage={workspace.deletePage}
                        showSidebar={setSidebar}
                    />
                    <Page
                        currPage={currPage}
                        saveChange={workspace.saveChange}
                    />
                </Wrapper>
            </div>
        </div>
    );
}

export default Workspace;
