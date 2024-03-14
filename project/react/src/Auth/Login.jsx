import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import FormInput from "./FormInput";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [passwordForgot, setPasswordForgot] = useState(false);
    const nav = useNavigate();

    const handleInputChange = (e) => {
        const obj = { ...user, [e.target.name]: e.target.value };
        setUser(obj);
    };

    const handlePassword = (e) => {
        e.preventDefault();
        setPasswordForgot(!passwordForgot);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://127.0.0.1:8000/api/login", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        // if(res.status == 200);
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
