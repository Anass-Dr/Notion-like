import { useRef } from "react";
import "./BlockOptions.css";

function BlockOptionsIcon({ handleOptions, blockId, cords, handleHover }) {
    const blockRef = useRef(null);
    
    const styles = cords && {
        top: cords.top + (cords.bottom - cords.top) / 2,
        left: cords.left - 60,
        padding: "0 1rem",
        transform: "translateY(-50%)"
    };

    const handleBlockOptions = () => {
        const cords = blockRef.current.getBoundingClientRect();
        handleOptions(true, cords, blockId);
    };

    return (
        <div
            style={cords ? styles : {}}
            ref={blockRef}
            className="block__options-icons"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            contentEditable="false"
            suppressContentEditableWarning={true}
        >
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
