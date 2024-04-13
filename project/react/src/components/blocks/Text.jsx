import { useEffect, useRef } from "react";

function Text({ id, type, active, handleBlock, handleActiveBlock, children }) {
    const divRef = useRef(null);

    useEffect(() => {
        if (active) divRef.current.focus();
    }, [active]);

    return (
        <div
            ref={divRef}
            className={`_${type} block`}
            data-type={`${type}`}
            data-id={id}
            onClick={() => handleActiveBlock(id)}
            onBlur={(e) => handleBlock(e.target.textContent)}
            contentEditable
        >
            {children}
        </div>
    );
}

export default Text;
