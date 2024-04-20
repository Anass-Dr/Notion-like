import Text from "./Text";
import FileBlock from "./FileBlock/FileBlock";

function BlockManager({ block, handleBlock, handleActiveBlock, handleBlockDelete, showPrompt }) {
    switch (block.type) {
        case "paragraph":
        case "heading1":
        case "heading2":
        case "heading3":
            return (
                <Text
                    block={block}
                    handleBlock={handleBlock}
                    handleActiveBlock={handleActiveBlock}
                    handleBlockDelete={handleBlockDelete}
                    showPrompt={showPrompt}
                >
                    {block.content}
                </Text>
            );
        case "image":
            return (
                <FileBlock
                    block={block}
                    title="Add image"
                    handleBlock={handleBlock}
                    handleActiveBlock={handleActiveBlock}
                >
                    <svg
                        role="graphics-symbol"
                        viewBox="0 0 30 30"
                        style={{
                            width: "25px",
                            height: "25px",
                            display: "block",
                            fill: "rgba(55, 53, 47, 0.45)",
                            flexShrink: 0,
                            marginRight: "12px",
                        }}
                    >
                        <path d="M1,4v22h28V4H1z M27,24H3V6h24V24z M18,10l-5,6l-2-2l-6,8h20L18,10z M11.216,17.045l1.918,1.918l4.576-5.491L21.518,20H9 L11.216,17.045z M7,12c1.104,0,2-0.896,2-2S8.104,8,7,8s-2,0.896-2,2S5.896,12,7,12z"></path>
                    </svg>
                </FileBlock>
            );
        case "video":
            return (
                <FileBlock
                    block={block}
                    title="Embed or upload a video"
                    handleBlock={handleBlock}
                    handleActiveBlock={handleActiveBlock}
                >
                    <svg
                        role="graphics-symbol"
                        viewBox="0 0 30 30"
                        className="video"
                        style={{
                            width: "25px",
                            height: "25px",
                            display: "block",
                            fill: "rgba(55, 53, 47, 0.45)",
                            flexShrink: 0,
                            marginRight: "12px",
                        }}
                    >
                        <path d="M2,2v26h26V2H2z M26,6h-2V4h2V6z M22,14H8V4h14V14z M6,10H4V8h2V10z M6,12v2H4v-2H6z M6,16v2H4v-2H6z M6,20v2H4v-2H6z M8,16 h14v10H8V16z M24,20h2v2h-2V20z M24,18v-2h2v2H24z M24,14v-2h2v2H24z M24,10V8h2v2H24z M6,4v2H4V4H6z M4,24h2v2H4V24z M24,26v-2h2v2 H24z"></path>
                    </svg>
                </FileBlock>
            );
        case "audio":
            return (
                <FileBlock
                    block={block}
                    title="Add an audio file"
                    handleBlock={handleBlock}
                    handleActiveBlock={handleActiveBlock}
                >
                    <svg
                        role="graphics-symbol"
                        viewBox="0 0 23.5 24"
                        className="audio"
                        style={{
                            width: "25px",
                            height: "25px",
                            display: "block",
                            fill: "rgba(55, 53, 47, 0.45)",
                            flexShrink: 0,
                            marginRight: "12px",
                        }}
                    >
                        <path d="M5.258 14.008a.661.661 0 01-.485-.203.702.702 0 01-.195-.492v-2.899c0-.187.065-.351.195-.492a.65.65 0 01.485-.211.67.67 0 01.5.21.694.694 0 01.203.493v2.899a.687.687 0 01-.203.492.68.68 0 01-.5.203zm2.695 3.148a.684.684 0 01-.688-.695V7.266c0-.193.066-.357.196-.493a.66.66 0 01.492-.21c.198 0 .362.07.492.21a.67.67 0 01.203.493v9.195a.67.67 0 01-.203.492.654.654 0 01-.492.203zm2.688 3.032a.645.645 0 01-.485-.204.667.667 0 01-.195-.492V4.234c0-.198.065-.364.195-.5a.645.645 0 01.485-.203.68.68 0 01.5.203.68.68 0 01.203.5v15.258a.654.654 0 01-.203.492.68.68 0 01-.5.203zm2.695-4.047a.684.684 0 01-.492-.196.684.684 0 01-.196-.492v-7.18a.684.684 0 01.688-.695.67.67 0 01.492.203.67.67 0 01.203.492v7.18a.684.684 0 01-.695.688zm2.695 2.328a.68.68 0 01-.695-.696V5.953c0-.193.065-.357.195-.492a.667.667 0 01.5-.211c.193 0 .354.07.485.21a.67.67 0 01.203.493v11.82a.67.67 0 01-.203.493.645.645 0 01-.485.203zm2.688-3.852a.654.654 0 01-.492-.203.675.675 0 01-.196-.484V9.797c0-.188.065-.35.196-.485.13-.14.294-.21.492-.21a.66.66 0 01.492.21.661.661 0 01.203.485v4.133a.661.661 0 01-.203.484.67.67 0 01-.492.203z"></path>
                    </svg>
                </FileBlock>
            );
        case "youtube":
            return (
                <FileBlock
                    block={block}
                    title="Add a youtube video"
                    handleBlock={handleBlock}
                    handleActiveBlock={handleActiveBlock}
                >
                    <img
                        src="http://127.0.0.1:8000/assets/images/block__youtube.svg"
                        alt="youtube_icon"
                    />
                </FileBlock>
            );
    }
}

export default BlockManager;
