import { Navigate } from "react-router-dom";

function Logout() {
    // Remove JWT Token :
    localStorage.clear();

    return <Navigate to="/login" />;
}

export default Logout;
