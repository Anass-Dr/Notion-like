import { useState, useEffect, useRef } from "react";
import { BlockOptionsContextProvider } from "../context/BlockOptionsContext";
import PromptBlock from "../components/PromptBlock";
import { endpoint } from "../config/fetch";
import "./editor.css";
import BlockManager from "../components/blocks/BlockManager";
import BlockOptions from "../components/blocks/BlockOptions/BlockOptions";

export default function Editor({ blocksData, handleBlocks }) {
    const [prompt, setPrompt] = useState(false);
    const [prompt__input, setPromptInput] = useState(true);
    const [prompt_placeholder, setPromptPlaceholder] = useState(true);
    const [cords, setCords] = useState([]);
    const [blockTypes, setBlockTypes] = useState([]);
    const promptInputRef = useRef(null);

    const handleActiveBlock = (id) => {
        const newState = blocksData.map((block) =>
            block.id == id
                ? { ...block, active: true }
                : { ...block, active: false }
        );
        handleBlocks(newState);
    };

    const handlePromptDisplay = () => {
        setPrompt(false);
        setPromptInput(true);
        setPromptPlaceholder(true);
    };

    const handlePromptPlacholder = (e) => {
        if (e.key === "/") {
            setPromptPlaceholder(false);
            setCords(e.target.getBoundingClientRect());
            setPrompt(true);
        } else if (
            e.key === "Backspace" &&
            e.currentTarget.textContent.length == 0
        ) {
            setPromptInput(false);
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

        const newState = [
            ...blocksData.map((block) => ({ ...block, active: false })),
            {
                id: blocksData.length,
                type,
                content: "",
                active: true,
            },
        ];
        handleBlocks(newState);
    };

    const handleBlockChange = (content) => {
        const newState = blocksData.map((block) =>
            block.active ? { ...block, content } : block
        );
        handleBlocks(newState);
    };

    const handleBlockDelete = (id) => {
        const newState = blocksData.filter((block) => block.id != id);
        handleBlocks(newState);
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
        if (promptInputRef.current) {
            promptInputRef.current.focus();
        }
    }, [prompt__input]);

    return (
        <>
            <BlockOptionsContextProvider>
                <div id="editor">
                    {blocksData.map((block, indx) => (
                        <BlockManager
                            key={indx}
                            block={block}
                            handleBlock={handleBlockChange}
                            handleActiveBlock={handleActiveBlock}
                            handleBlockDelete={handleBlockDelete}
                            showPrompt={handlePromptDisplay}
                        />
                    ))}
                    {prompt__input && (
                        <div
                            ref={promptInputRef}
                            onKeyDown={handlePromptKey}
                            className={`prompt__input ${
                                prompt_placeholder ? "prompt__input-after" : ""
                            }`}
                            contentEditable
                            suppressContentEditableWarning={true}
                        ></div>
                    )}
                    {prompt && (
                        <Prompt
                            cords={cords}
                            types={blockTypes}
                            handleBlockClick={handleBlockClick}
                            setPrompt={setPrompt}
                        />
                    )}

                    <BlockOptions handleDelete={handleBlockDelete} />
                    <div
                        id="whitespace"
                        onClick={() => setPromptInput(true)}
                    ></div>
                </div>
            </BlockOptionsContextProvider>
        </>
    );
}

function Prompt({ cords, types, handleBlockClick, setPrompt }) {
    const windowHeight = window.innerHeight;
    const height = windowHeight * 0.4;
    const styles = { left: cords.left };
    if (cords.bottom + height > windowHeight)
        styles.bottom = windowHeight - cords.top;
    else styles.top = cords.bottom;

    const hidePrompt = () => setPrompt(false);

    return (
        <>
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
            <div id="offset" onClick={hidePrompt}></div>
        </>
    );
}
