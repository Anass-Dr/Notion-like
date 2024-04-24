import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { WorkspaceContextProvider } from "./context/WorkspaceContext";

function App() {
    return (
        <ToasterContextProvider>
            <AuthContextProvider>
                <Router>
                    <Toast />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/reset-password/:token"
                            element={<ResetPassword />}
                        />
                        <Route
                            path="/"
                            element={
                                <WorkspaceContextProvider>
                                    <Workspace />
                                </WorkspaceContextProvider>
                            }
                        />
                        <Route
                            path="/:username"
                            element={
                                <WorkspaceContextProvider>
                                    <Workspace />
                                </WorkspaceContextProvider>
                            }
                        />
                        <Route
                            path="/:username/:pageName"
                            element={
                                <WorkspaceContextProvider>
                                    <Workspace />
                                </WorkspaceContextProvider>
                            }
                        />
                        <Route path="/pages/:token" element={<PublicPage />} />
                        <Route path="/Not-found" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </AuthContextProvider>
        </ToasterContextProvider>
    );
}

export default App;
