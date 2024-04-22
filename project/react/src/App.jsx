import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Logout from "./pages/Auth/Logout";
import ResetPassword from "./pages/Auth/ResetPassword";
import Workspace from "./pages/Workspace/Workspace";
import Toast from "./components/Toast";
import { ToasterContextProvider } from "./context/ToasterContext";
import PublicPage from "./pages/PublicPage/PublicPage";
import NotFound from "./pages/NotFound/NotFound";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthContextProvider>
            <ToasterContextProvider>
                <Router>
                    <Toast />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/reset-password/:token"
                            element={<ResetPassword />}
                        />
                        <Route path="/:username" element={<Workspace />} />
                        <Route path="/pages/:token" element={<PublicPage />} />
                        <Route path="/Not-found" element={<NotFound />} />
                    </Routes>
                </Router>
            </ToasterContextProvider>
        </AuthContextProvider>
    );
}

export default App;
