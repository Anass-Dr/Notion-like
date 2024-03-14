import Header from "./Header";
import "./auth.css";

export default function Auth({ children }) {
    return (
        <div className="container">
            <Header />
            {children}
        </div>
    );
}
