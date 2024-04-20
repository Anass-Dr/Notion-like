import { useState, useEffect } from "react";
import hljs from "highlight.js";
import "./CodeBlock.css";

function CodeBlock({ block, handleBlock, handleActiveBlock }) {
    const [showLang, setShowLang] = useState(false);

    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return (
        <div
            className="_code block"
            data-type={`${block.type}`}
            data-id={block.id}
            onClick={() => handleActiveBlock(block.id)}
        >
            <div className="languages-container">
                <div className="prompt-ellipses">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span
                    className="code-language"
                    onClick={() => setShowLang((prev) => !prev)}
                >
                    JavaScript <i className="fa-solid fa-chevron-down"></i>
                </span>
                {showLang && <LanguagesPrompt showPrompt={setShowLang} />}
            </div>
            <pre>
                <code
                    onBlur={(e) => handleBlock(e.currentTarget.textContent)}
                    className="javascript"
                    data-id="testing"
                    contentEditable
                >
                    {block.content}
                </code>
            </pre>
        </div>
    );
}

export default CodeBlock;

function LanguagesPrompt({ showPrompt }) {
    return (
        <>
            <div className="languages-prompt">
                <div className="prompt__search">
                    <input type="search" placeholder="Search for a language…" />
                </div>
                <ul>
                    <li>C</li>
                    <li>C++</li>
                    <li>JavaScript</li>
                    <li>Python</li>
                    <li>PHP</li>
                    <li>Java</li>
                </ul>
            </div>
            <div
                onClick={() => showPrompt(false)}
                id="languages-prompt__offset"
            ></div>
        </>
    );
}
