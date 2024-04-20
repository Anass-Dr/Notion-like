import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import FormInput from "./FormInput";
import { endpoint } from "../../config/fetch";
import { ToasterContext } from "../../context/ToasterContext";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const toaster = useContext(ToasterContext);
    const auth = useContext(AuthContext);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [passwordForgot, setPasswordForgot] = useState(false);
    const nav = useNavigate();

    // #- Handlers :
    function handleInputChange(e) {
        const obj = { ...user, [e.target.name]: e.target.value };
        setUser(obj);
    }

    function handlePassword(e) {
        e.preventDefault();
        setPasswordForgot(!passwordForgot);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordForgot) forgotPassword();
        else login();
    }

    // #- Methods :
    const login = async () => {
        const res = await fetch(`${endpoint}/login`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        const toasterType = Object.keys(data)[0];
        toaster.add(toasterType, data[toasterType]);
        if (res.status == 200) {
            localStorage.setItem("jwt_token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            auth.login();
            nav(`/${data.user.username.toLowerCase()}`);
        }
    };

    const forgotPassword = async () => {
        const res = await fetch(`${endpoint}/forgot-password`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
        });
        const data = await res.json();
        const toasterType = Object.keys(data)[1];
        toaster.add(toasterType, data[toasterType]);
    };

    return (
        <Auth>
            <main>
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address..."
                        value={user.email}
                        onChange={handleInputChange}
                    />
                    {!passwordForgot && (
                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={handleInputChange}
                        />
                    )}
                    <button type="submit">
                        {passwordForgot ? "Send reset link" : "Submit"}
                    </button>
                    <div className="form-footer">
                        <a
                            onClick={handlePassword}
                            href={
                                passwordForgot ? "/login" : "/forgot-password"
                            }
                        >
                            {passwordForgot
                                ? "Continue with email"
                                : "Forgot your password?"}
                        </a>
                        <p>
                            Don`t have an account?{" "}
                            <Link to="/register">Sign up</Link>
                        </p>
                    </div>
                </form>
            </main>
        </Auth>
    );
}

export default Login;
