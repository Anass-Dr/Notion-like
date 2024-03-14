import Auth from "./Auth/Auth";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

function App() {
    return (
        <Auth>
            {/* <Login /> */}
            <Register />
        </Auth>
    );
}

export default App;
