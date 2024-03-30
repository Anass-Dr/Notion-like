import { useState, useEffect, useRef } from "react";
import PromptBlock from "../components/PromptBlock";
import { endpoint } from "../config/fetch";
import "./editor.css";
import BlockManager from "../components/blocks/BlockManager";

export default function Editor({ blocksData, saveChange }) {
    const [prompt, setPrompt] = useState(false);
    const [prompt__input, setPromptInput] = useState(true);
    const [prompt_placeholder, setPromptPlaceholder] = useState(true);
    const [cords, setCords] = useState([]);
    const [blockTypes, setBlockTypes] = useState([]);
    const [blocks, setBlocks] = useState(blocksData);
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
        const content = e.currentTarget.textContent;
        setPrompt(false);
        setPromptInput(false);
        // editorRef.current.insertAdjacentHTML(
        //     "beforeend",
        //     handleBlockHTML(type)
        // );
        setBlocks((prev) => [
            ...prev,
            {
                type,
                content,
            },
        ]);
        editorRef.current.lastElementChild.focus();
    };

    // Side Effects :
    useEffect(() => {
        const fetchBlockTypes = async () => {
            const res = await fetch(`${endpoint}/block-types`);
            const data = await res.json();
            setBlockTypes(data);
        };
        fetchBlockTypes();
    }, []);

    useEffect(() => {
        saveChange("blocks", blocks);
    }, [blocks]);

    // useEffect(() => {
    //     if (blocks.length) {
    //         setPromptInput(false);
    //         blocks.map((block) => {
    //             editorRef.current.insertAdjacentHTML(
    //                 "beforeend",
    //                 blockTypes[block.type]
    //             );
    //         });
    //     }
    // }, [blocks, blockTypes]);

    useEffect(() => {
        if (promptInputRef.current) {
            promptInputRef.current.focus();
        }
    }, [prompt__input]);

    return (
        <div id="editor" ref={editorRef} onKeyDown={handleChange}>
            {blocks.map((block, indx) => (
                <BlockManager key={indx} block={block} />
            ))}
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
