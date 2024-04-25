import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "./CodeBlock.css";

function CodeBlock({ block, handleBlock, handleActiveBlock }) {
    const divRef = useRef();
    const codeRef = useRef();

    useEffect(() => {
        codeRef.current.removeAttribute("data-highlighted");
        hljs.highlightElement(codeRef.current);
    }, [block.content.snippet]);

    const handleBlockChange = (snippet) => {
        handleBlock({
            snippet,
            lang: "javascript",
        });
    };

    return (
        <div
            className="_code block"
            data-type={`${block.type}`}
            data-id={block.id}
            onClick={() => handleActiveBlock(block.id)}
        >
            <div ref={divRef} className="languages-container">
                <div className="prompt-ellipses">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <pre>
                <code
                    ref={codeRef}
                    onBlur={(e) => handleBlockChange(e.target.textContent)}
                    className={`hljs ${block.content.lang}`}
                    contentEditable
                    suppressContentEditableWarning={true}
                >
                    {block.content.snippet}
                </code>
            </pre>
        </div>
    );
}

export default CodeBlock;
