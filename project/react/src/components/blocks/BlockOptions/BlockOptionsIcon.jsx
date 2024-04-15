import { useRef } from "react";
import "./BlockOptions.css";

function BlockOptionsIcon({ handleOptions, blockId }) {
    const blockRef = useRef(null);

    const handleBlockOptions = () => {
        const cords = blockRef.current.getBoundingClientRect();
        handleOptions(true, cords, blockId);
    };

    return (
        <div ref={blockRef} className="block__options-icons" contentEditable="false">
            <span className="add">
                <i className="fa-solid fa-plus"></i>
            </span>
            <span onClick={handleBlockOptions} className="show">
                <i className="fa-solid fa-ellipsis-vertical"></i>
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </span>
        </div>
    );
}

export default BlockOptionsIcon;
