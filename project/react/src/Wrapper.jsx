import { useContext } from "react";
import { WorkspaceContext } from "./context/WorkspaceContext";
import Loading from "./components/Loading";

function Wrapper({ children }) {
    const { data } = useContext(WorkspaceContext);

    return <>{data.length ? children : <Loading />}</>;
}

export default Wrapper;
