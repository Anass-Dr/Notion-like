import Image from "./Image";

function BlockManager({ block }) {
    switch (block.type) {
        case "paragraph":
        case "heading1":
        case "heading2":
        case "heading3":
            return `<div class="_${type} block" data-type="${type}" contentEditable></div>`;
        case "image":
            return <Image />;
    }
}

export default BlockManager;
