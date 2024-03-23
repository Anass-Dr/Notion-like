import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Auth from "./Auth";
import FormInput from "./FormInput";
import { endpoint } from "../../config/fetch";
import { validateEmail, validatePassword } from "../../services/FormValidator";

function Register() {
    const nav = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [isCredentialsValid, setIsCredentialsValid] = useState({
        username: true,
        email: true,
        password: true,
        passwordConfirmation: true,
    });

    const handleInputChange = (e) => {
        const obj = { ...user, [e.target.name]: e.target.value };
        setUser(obj);
    };

    const handleInputValidation = () => {
        setIsCredentialsValid({
            username: true,
            email: true,
            password: true,
            passwordConfirmation: true,
        });
        let isValid = true;

        if (user.username.length < 3) {
            isValid = false;
            setIsCredentialsValid((prev) => ({ ...prev, username: false }));
        }
        if (!validateEmail(user.email)) {
            isValid = false;
            setIsCredentialsValid((prev) => ({ ...prev, email: false }));
        }
        if (!validatePassword(user.password)) {
            isValid = false;
            setIsCredentialsValid((prev) => ({ ...prev, password: false }));
        }
        if (user.password !== user.password_confirmation) {
            isValid = false;
            setIsCredentialsValid((prev) => ({
                ...prev,
                passwordConfirmation: false,
            }));
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleInputValidation()) return;

        const res = await fetch(`${endpoint}/register`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();

        if (data.success) return nav("/login");
    };

    return (
        <Auth>
            <main>
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Username"
                        name="username"
                        type="text"
                        placeholder="Enter your username..."
                        value={user.username}
                        error={
                            !isCredentialsValid.username && {
                                msg: "Username must be at least 3 characters",
                            }
                        }
                        onChange={handleInputChange}
                    />
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address..."
                        value={user.email}
                        error={
                            !isCredentialsValid.email && {
                                msg: "Invalid Email",
                            }
                        }
                        onChange={handleInputChange}
                    />
                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={user.password}
                        error={
                            !isCredentialsValid.password && {
                                msg: "Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
                            }
                        }
                        onChange={handleInputChange}
                    />
                    <FormInput
                        label="Confirm Password"
                        name="password_confirmation"
                        type="password"
                        placeholder="Confirm your password"
                        value={user.password_confirmation}
                        error={
                            !isCredentialsValid.passwordConfirmation && {
                                msg: "Password Not match",
                            }
                        }
                        onChange={handleInputChange}
                    />
                    <button type="submit">Submit</button>
                    <div className="form-footer">
                        <p>
                            Already have an account?{" "}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </form>
            </main>
        </Auth>
    );
}

export default Register;
