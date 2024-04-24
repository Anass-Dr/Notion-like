import { useState, useEffect, useRef } from "react";
import hljs from "highlight.js";
import "./CodeBlock.css";

function CodeBlock({ block, handleBlock, handleActiveBlock }) {
    const [showLang, setShowLang] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [currLang, setCurrLang] = useState(
        block.content.lang || "javascript"
    );
    const divRef = useRef();
    const codeRef = useRef();

    useEffect(() => {
        hljs.highlightAll();
        const fetchData = async () => {
            const response = await fetch("supported-languages.json");
            const jsonData = await response.json();
            setLanguages(jsonData.languages);
        };
        fetchData();
    }, []);

    const handleLanguage = (lang) => {
        setCurrLang(lang);
        setShowLang(false);
    };

    const handleBlockChange = (snippet) => {
        handleBlock({
            snippet,
            lang: currLang,
        });
    };

    return (
        <>
            {showLang && (
                <LanguagesPrompt
                    cords={divRef.current.getBoundingClientRect()}
                    showPrompt={setShowLang}
                    languages={languages}
                    handleLanguage={handleLanguage}
                />
            )}
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
                    <span
                        className="code-language"
                        onClick={() => setShowLang((prev) => !prev)}
                    >
                        {currLang} <i className="fa-solid fa-chevron-down"></i>
                    </span>
                </div>
                <pre>
                    <code
                        ref={codeRef}
                        onBlur={(e) => handleBlockChange(e.target.textContent)}
                        className={currLang}
                        contentEditable
                    >
                        {block.content.snippet}
                    </code>
                </pre>
            </div>
        </>
    );
}

export default CodeBlock;

function LanguagesPrompt({ showPrompt, languages, cords, handleLanguage }) {
    const styles = {
        top: cords.bottom,
        left: cords.left + cords.width,
        transform: "translateX(-100%)",
    };
    return (
        <>
            <div style={styles} className="languages-prompt">
                <div className="prompt__search">
                    <input type="search" placeholder="Search for a language…" />
                </div>
                <ul>
                    {languages.map((lang, indx) => (
                        <li onClick={() => handleLanguage(lang)} key={indx}>
                            {lang}
                        </li>
                    ))}
                </ul>
            </div>
            <div
                onClick={() => showPrompt(false)}
                id="languages-prompt__offset"
            ></div>
        </>
    );
}
