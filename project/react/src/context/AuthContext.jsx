import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        console.log("working");
    };

    const register = () => {};

    const logout = () => {};

    return (
        <AuthContext.Provider value={(isLoggedIn, login, register, logout)}>
            {children}
        </AuthContext.Provider>
    );
}
