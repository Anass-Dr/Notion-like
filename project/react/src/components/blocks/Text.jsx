import { useState, useEffect, useRef, useContext } from "react";
import BlockOptionsIcon from "./BlockOptions/BlockOptionsIcon";
import { BlockOptionsContext } from "../../context/BlockOptionsContext";

function Text({
    block,
    handleBlock,
    handleActiveBlock,
    handleBlockDelete,
    showPrompt,
    children,
}) {
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

    const handleKey = (e) => {
        if (e.key === "Backspace" && e.currentTarget.textContent.length == 0) {
            handleBlockDelete(block.id);
        } else if (e.key === "Enter") {
            e.preventDefault();
            showPrompt();
        }
    };

    return (
        <>
            <div
                ref={divRef}
                className={`_${block.type} block`}
                data-type={`${block.type}`}
                data-id={block.id}
                onKeyDown={handleKey}
                onClick={() => handleActiveBlock(block.id)}
                onBlur={(e) => handleBlock(e.target.textContent)}
                onMouseEnter={handleBlockOptionsIcon}
                onMouseLeave={handleBlockOptionsIcon}
                contentEditable
                suppressContentEditableWarning={true}
            >
                {children}
            </div>
            {onHover && (
                <BlockOptionsIcon
                    blockId={block.id}
                    handleOptions={handleOptions}

                    handleHover={handleBlockOptionsIcon}
                    cords={divRef.current.getBoundingClientRect()}
                />
            )}
        </>
    );
}

export default Text;
