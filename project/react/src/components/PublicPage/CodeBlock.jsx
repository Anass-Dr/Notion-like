import { useEffect } from "react";
import hljs from "highlight.js";

function CodeBlock({ content }) {
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return (
        <pre className="block">
            <code className="javascript">{content.snippet}</code>
        </pre>
    );
}

export default CodeBlock;
