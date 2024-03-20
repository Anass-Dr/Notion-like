import { useState, useEffect } from "react";
import "./editor.css";
import PromptBlock from "../components/PromptBlock";

function Editor() {
    const [prompt, setPrompt] = useState(false);
    const [cords, setCords] = useState([]);

    const handleChange = (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            setPrompt(false);
        } else if (e.key == "/" && !e.currentTarget.textContent.length) {
            const cords = e.currentTarget.getBoundingClientRect();
            setCords([+cords.top + 30, cords.left]);
            setPrompt(true);
        } else {
            setPrompt(false);
        }
    };

    useEffect(() => {
        document
            .querySelector("._paragraph")
            ?.addEventListener("keydown", (e) => {
                const target = e.currentTarget;
                const placeholder = target.textContent.length
                    ? ""
                    : "Write something, or press '/' for commands…";
                document.documentElement.style.setProperty(
                    "--after-content",
                    placeholder
                );
            });
    });

    return (
        <div id="editor" onKeyDown={handleChange}>
            <div className="_paragraph" contentEditable></div>
            {prompt && <Prompt top={cords[0]} left={cords[1]} />}
        </div>
    );
}

export default Editor;

function Prompt({ top, left }) {
    const styles = { top, left };

    return (
        <div style={styles} id="prompt" contentEditable="false">
            <span className="prompt__head">Basic blocks</span>
            <PromptBlock
                title="Text"
                src="https://www.notion.so/images/blocks/text/en-US.png"
                description="Just start writing with plain text."
            />
            <PromptBlock
                title="Text"
                src="https://www.notion.so/images/blocks/text/en-US.png"
                description="Just start writing with plain text."
            />
            <PromptBlock
                title="Text"
                src="https://www.notion.so/images/blocks/text/en-US.png"
                description="Just start writing with plain text."
            />
        </div>
    );
}
