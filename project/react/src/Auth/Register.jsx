import { useState, useEffect } from "react";
import FormInput from "./FormInput";

function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleInputChange = (e) => {
        const obj = { ...user, [e.target.name]: e.target.value };
        setUser(obj);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const req = await fetch("http://127.0.0.1:8000/api/register", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const res = await req.json();
        console.log(res);
    };

    return (
        <main>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Enter your username..."
                    value={user.username}
                    onChange={handleInputChange}
                />
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address..."
                    value={user.email}
                    onChange={handleInputChange}
                />
                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={handleInputChange}
                />
                <FormInput
                    label="Confirm Password"
                    name="password_confirmation"
                    type="password"
                    placeholder="Confirm your password"
                    value={user.password_confirmation}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
                <div className="form-footer">
                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </form>
        </main>
    );
}

export default Register;
