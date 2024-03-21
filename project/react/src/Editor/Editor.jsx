import { useState, useEffect, useRef } from "react";
import PromptBlock from "../components/PromptBlock";
import "./editor.css";

// Blocks HTML :
const blocksHTML = {
    Text: '<div class="_paragraph block" data-type="Text" contentEditable></div>',
    "Heading 1":
        '<div class="_heading1 block" data-type="Heading 1" contentEditable></div>',
    "Heading 2":
        '<div class="_heading2 block" data-type="Heading 2" contentEditable></div>',
    "Heading 3":
        '<div class="_heading3 block" data-type="Heading 3" contentEditable></div>',
};

export default function Editor() {
    const [prompt, setPrompt] = useState(false);
    const [prompt__input, setPromptInput] = useState(true);
    const [cords, setCords] = useState([]);
    const [blockTypes, setBlockTypes] = useState([]);
    const editorRef = useRef();
    const promptInputRef = useRef();

    const handleChange = (e) => {
        const target = e.target;
        if (e.key == "Enter") {
            e.preventDefault();
            setPrompt(false);
            setPromptInput(true);
            editorRef.current.lastElementChild.focus();
        } else if (
            target.classList.contains("prompt__input") &&
            e.key == "/" &&
            !e.currentTarget.textContent.length
        ) {
            const cords = e.target.getBoundingClientRect();
            setCords([+cords.top + 30, cords.left]);
            setPrompt(true);
        } else {
            setPrompt(false);
        }
    };

    const handlePromptPlacholder = (e) => {
        const placeholder = e.key === "/" ? "Press '/' for commands…" : "";
        document.documentElement.style.setProperty(
            "--after-content",
            placeholder
        );
    };

    const handlePromptKey = (e) => {
        if (e.key !== "/" && e.key !== "Delete" && e.key !== "Backspace") {
            return e.preventDefault();
        }

        // Handle Prompt input placeholder :
        handlePromptPlacholder(e);
    };

    const handleBlockClick = (e) => {
        const type = e.currentTarget.dataset.type;
        setPrompt(false);
        setPromptInput(false);
        editorRef.current.insertAdjacentHTML("beforeend", blocksHTML[type]);
        editorRef.current.lastElementChild.focus();
    };

    // Side Effects :
    useEffect(() => {
        const prompt__input = document.querySelector(".prompt__input");

        prompt__input?.addEventListener("keydown", handlePromptKey);

        return () =>
            prompt__input?.removeEventListener("keydown", handlePromptKey);
    });

    useEffect(() => {
        const fetchBlockTypes = async () => {
            const res = await fetch("http://127.0.0.1:8000/api/block-types");
            const data = await res.json();
            setBlockTypes(data);
        };

        fetchBlockTypes();
    }, []);

    return (
        <div id="editor" ref={editorRef} onKeyDown={handleChange}>
            {prompt__input && (
                <div className="prompt__input" contentEditable></div>
            )}
            {prompt && (
                <Prompt
                    top={cords[0]}
                    left={cords[1]}
                    types={blockTypes}
                    handleBlockClick={handleBlockClick}
                    promptInputRef={promptInputRef}
                />
            )}
        </div>
    );
}

function Prompt({ top, left, types, handleBlockClick, promptInputRef }) {
    const styles = { top, left };

    return (
        <div
            ref={promptInputRef}
            style={styles}
            id="prompt"
            contentEditable="false"
        >
            <span className="prompt__head">Basic blocks</span>
            {types.map((type) => (
                <PromptBlock
                    key={type.id}
                    title={type.name}
                    src={type.image}
                    description={type.description}
                    handleClick={handleBlockClick}
                />
            ))}
        </div>
    );
}
