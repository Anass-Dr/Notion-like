import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Logout from "./pages/Auth/Logout";
import Workspace from "./pages/Workspace/Workspace";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/contact",
            element: <Contact />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/logout",
            element: <Logout />,
        },
        {
            path: "/:username",
            element: <Workspace />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
