import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
    const auth = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        auth.logout();
        nav("/login");
    }, [auth, nav]);
    return;
}

export default Logout;
