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

export default function Editor({ blocks, saveChange }) {
    const [prompt, setPrompt] = useState(false);
    const [prompt__input, setPromptInput] = useState(true);
    const [prompt_placeholder, setPromptPlaceholder] = useState(true);
    const [cords, setCords] = useState([]);
    const [blockTypes, setBlockTypes] = useState([]);
    const editorRef = useRef(null);
    const promptInputRef = useRef(null);

    const handleChange = (e) => {
        const editorBlocksNb = editorRef.current.querySelectorAll("div").length;
        if (e.key == "Enter") {
            e.preventDefault();
            setPrompt(false);
            setPromptInput(true);
            setPromptPlaceholder(true);
        } else if (e.key == "Backspace" && e.target.textContent.length == 0) {
            if (e.target.classList.contains("prompt__input")) {
                if (editorBlocksNb > 1) setPromptInput(false);
            } else {
                e.target.remove();
                if (editorBlocksNb <= 1) setPromptInput(true);
            }
        }
    };

    const handlePromptPlacholder = (e) => {
        if (e.key === "/") {
            setPromptPlaceholder(false);
            const cords = e.target.getBoundingClientRect();
            setCords([+cords.top + 30, cords.left]);
            setPrompt(true);
        } else {
            setPromptPlaceholder(true);
            setPrompt(false);
        }
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
        const fetchBlockTypes = async () => {
            const res = await fetch("http://127.0.0.1:8000/api/block-types");
            const data = await res.json();
            setBlockTypes(data);
        };
        fetchBlockTypes();
    }, []);

    useEffect(() => {
        if (blocks.length) {
            setPromptInput(false);
            blocks.map((block) => {
                editorRef.current.insertAdjacentHTML(
                    "beforeend",
                    blockTypes[block.type]
                );
            });
        }
    }, [blocks, blockTypes]);

    useEffect(() => {
        if (promptInputRef.current) {
            promptInputRef.current.focus();
        }
    }, [prompt__input]);

    return (
        <div id="editor" ref={editorRef} onKeyDown={handleChange}>
            {prompt__input && (
                <div
                    ref={promptInputRef}
                    onKeyDown={handlePromptKey}
                    className={`prompt__input ${
                        prompt_placeholder ? "prompt__input-after" : ""
                    }`}
                    contentEditable
                ></div>
            )}
            {prompt && (
                <Prompt
                    top={cords[0]}
                    left={cords[1]}
                    types={blockTypes}
                    handleBlockClick={handleBlockClick}
                />
            )}
        </div>
    );
}

function Prompt({ top, left, types, handleBlockClick }) {
    const styles = { top, left };

    return (
        <div style={styles} id="prompt" contentEditable="false">
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
