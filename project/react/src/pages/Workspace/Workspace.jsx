import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Page from "./Page/Page";
import { WorkspaceContextProvider } from "../../context/WorkspaceContext";
import Wrapper from "../../Wrapper";
import "./main.css";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";

function Workspace() {
    // const nav = useNavigate();
    const { loading, isLoggedIn } = useContext(AuthContext);
    const nav = useNavigate();
    const { username } = useParams();

    if (loading) return <Loading />
    if (!isLoggedIn) nav("/login");

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
