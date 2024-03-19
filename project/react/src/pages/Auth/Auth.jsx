import Header from "./Header";
import "./auth.css";

export default function Auth({ children }) {
    return (
        <div id="auth">
            <div className="container">
                <Header />
                {children}
            </div>
        </div>
    );
}
