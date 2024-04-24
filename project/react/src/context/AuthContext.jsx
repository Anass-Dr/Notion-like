import { createContext, useState, useEffect, useContext } from "react";
import { endpoint } from "../config/fetch";
import { ToasterContext } from "./ToasterContext";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const toaster = useContext(ToasterContext);

    useEffect(() => {
        if (localStorage.getItem("jwt_token")) {
            const user = JSON.parse(localStorage.getItem("user"));
            setUser({ ...user, isLoggedIn: true });
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const res = await fetch(`${endpoint}/login`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await res.json();
        const toasterType = Object.keys(data)[0];
        toaster.add(toasterType, data[toasterType]);

        if (res.status == 200) {
            localStorage.setItem("jwt_token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser({
                username: data.user.username.toLowerCase(),
                isLoggedIn: true,
                testing: true,
            });
            return true;
        }

        return false;
    };

    const register = async (credentials) => {
        const res = await fetch(`${endpoint}/register`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await res.json();
        const notifType = Object.keys(data)[0];
        toaster.add(notifType, data[notifType]);

        if (data.success) return true;

        return false;
    };

    const logout = () => {
        // Remove JWT Token :
        localStorage.clear();
    };

    const forgotPassword = async (email) => {
        const res = await fetch(`${endpoint}/forgot-password`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        const toasterType = Object.keys(data)[1];
        toaster.add(toasterType, data[toasterType]);
    };

    return (
        <AuthContext.Provider
            value={{ loading, user, login, register, logout, forgotPassword }}
        >
            {children}
        </AuthContext.Provider>
    );
}
