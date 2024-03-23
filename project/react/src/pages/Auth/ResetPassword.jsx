import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { endpoint } from "../../config/fetch";
import Auth from "./Auth";
import FormInput from "./FormInput";
import { validatePassword } from "../../services/FormValidator";

function ResetPassword() {
    const { token } = useParams();
    const [user, setUser] = useState({
        id: token.split("@")[1],
        password: "",
        password_confirmation: "",
    });
    const [isCredentialsValid, setIsCredentialsValid] = useState({
        password: true,
        passwordConfirmation: true,
    });
    const nav = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const res = await fetch(`${endpoint}/reset-password/${token}`);
            if (res.status !== 200) nav("/login");
        };
        checkToken();
    }, [token, nav]);

    const handleInputChange = (e) => {
        const obj = { ...user, [e.target.name]: e.target.value };
        setUser(obj);
    };

    const handleInputValidation = () => {
        setIsCredentialsValid({
            password: true,
            passwordConfirmation: true,
        });
        let isValid = true;

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

        const res = await fetch(`${endpoint}/reset-password`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (res.status == 204) nav("/login");
    };

    return (
        <Auth>
            <main>
                <h2>New Password</h2>
                <form onSubmit={handleSubmit}>
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
                </form>
            </main>
        </Auth>
    );
}

export default ResetPassword;
