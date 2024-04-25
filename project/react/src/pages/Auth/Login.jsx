import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import FormInput from "./FormInput";
import { AuthContext } from "../../context/AuthContext";

function Login() {
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
        const result = await auth.login(user);
        if (result) nav(`/`);
    };

    const forgotPassword = () => auth.forgotPassword(user.email);

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
