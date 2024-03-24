import { useContext, useEffect } from "react";
import { ToasterContext } from "../context/ToasterContext";
import "./toast.css";

function Toast() {
    const toaster = useContext(ToasterContext);

    useEffect(() => {
        setTimeout(toaster.reset, 10000);
    }, [toaster]);

    if (!toaster.data.type) return;

    return (
        <div className={`toast toast-${toaster.data.type}`}>
            <div className="toast__icon">
                {toaster.data.type === "info" && (
                    <i className="fa-solid fa-info"></i>
                )}
                {toaster.data.type === "success" && (
                    <i className="fa-solid fa-check"></i>
                )}
                {toaster.data.type === "error" && (
                    <i className="fa-solid fa-triangle-exclamation"></i>
                )}
            </div>
            <div className="toast__body">
                <span>{toaster.data.type}</span>
                <span>{toaster.data.content}</span>
            </div>
            <div className="toast__close">
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
    );
}

export default Toast;
