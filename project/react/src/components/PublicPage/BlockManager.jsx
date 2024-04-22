import Text from "./Text";
import ImageBlock from "../blocks/ImageBlock/ImageBlock";
import AudioBlock from "../blocks/AudioBlock/AudioBlock";
import YoutubeBlock from "../blocks/YoutubeBlock/YoutubeBlock";
import VideoBlock from "../blocks/VideoBlock/VideoBlock";
import CodeBlock from "./CodeBlock";

function BlockManager({ block }) {
    switch (block.type) {
        case "paragraph":
        case "heading1":
        case "heading2":
        case "heading3":
            return <Text type={block.type}>{block.content}</Text>;
        case "image":
            return <ImageBlock src={block.content} />;
        case "vieo":
            return <VideoBlock src={block.content} />;
        case "audio":
            return <AudioBlock src={block.content} />;
        case "youtube":
            return <YoutubeBlock src={block.content} />;
        case "code":
            return <CodeBlock content={block.content} />;
    }
}

export default BlockManager;
