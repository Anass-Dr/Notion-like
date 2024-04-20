import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("jwt_token")) setIsLoggedIn(true);
        setLoading(false);
    }, []);

    const login = () => {
        setIsLoggedIn(true);
    };

    const register = () => {};

    const logout = () => {};

    return (
        <AuthContext.Provider value={{ loading, isLoggedIn, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
