import { useState, useEffect, useRef, useContext } from "react";
import BlockOptionsIcon from "./BlockOptions/BlockOptionsIcon";
import { BlockOptionsContext } from "../../context/BlockOptionsContext";

function Text({ block, handleBlock, handleActiveBlock, children }) {
    const [onHover, setOnHover] = useState(false);
    const { handleOptions } = useContext(BlockOptionsContext);
    const divRef = useRef(null);

    useEffect(() => {
        if (block.active) divRef.current.focus();
    }, [block.active]);

    const handleBlockOptionsIcon = (e) => {
        if (e.type === "mouseenter") {
            setOnHover(true);
        } else {
            setOnHover(false);
        }
    };

    return (
        <div
            ref={divRef}
            className={`_${block.type} block`}
            data-type={`${block.type}`}
            data-id={block.id}
            onClick={() => handleActiveBlock(block.id)}
            onBlur={(e) => handleBlock(e.target.textContent)}
            onMouseEnter={handleBlockOptionsIcon}
            onMouseLeave={handleBlockOptionsIcon}
            contentEditable
        >
            {onHover && (
                <BlockOptionsIcon
                    blockId={block.id}
                    handleOptions={handleOptions}
                />
            )}
            {children}
        </div>
    );
}

export default Text;
