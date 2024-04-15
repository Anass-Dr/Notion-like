import { useState, useRef, useContext } from "react";
import { BlockOptionsContext } from "../../../context/BlockOptionsContext";
import FileToolbar from "../FileToolbar/FileToolbar";
import ImageBlock from "../ImageBlock/ImageBlock";
import VideoBlock from "../VideoBlock/VideoBlock";
import AudioBlock from "../AudioBlock/AudioBlock";
import BlockOptionsIcon from "../BlockOptions/BlockOptionsIcon";
import upload from "../../../config/upload";
import "./FileBlock.css";

function FileBlock({ block, title, handleBlock, handleActiveBlock, children }) {
    const [showToolbar, setToolbar] = useState(false);
    const [onHover, setOnHover] = useState(false);
    const blockRef = useRef(null);
    const { handleOptions } = useContext(BlockOptionsContext);

    const handleFile = async (type, src) => {
        if (type === "link") handleBlock(src);
        else {
            const result = await upload(src);
            handleBlock(result.path);
            setToolbar(false);
        }
    };

    const handleBlockOptionsIcon = (e) => {
        if (e.type === "mouseenter") {
            setOnHover(true);
        } else {
            setOnHover(false);
        }
    };

    let element = "";

    switch (block.type) {
        case "image":
            element = <ImageBlock src={block.content} />;
            break;
        case "video":
            element = <VideoBlock src={block.content} />;
            break;
        case "audio":
            element = <AudioBlock src={block.content} />;
            break;
    }

    return (
        <>
            <div
                ref={blockRef}
                className="block"
                onClick={() => handleActiveBlock(block.id)}
                data-type={block.type}
                data-id={block.id}
                onMouseEnter={handleBlockOptionsIcon}
                onMouseLeave={handleBlockOptionsIcon}
            >
                {onHover && (
                    <BlockOptionsIcon
                        blockId={block.id}
                        handleOptions={handleOptions}
                    />
                )}
                {block.content ? (
                    element
                ) : (
                    <div onClick={() => setToolbar(true)} className="_file">
                        <div className="icon">{children}</div>
                        <span>{title}</span>
                    </div>
                )}
            </div>
            {showToolbar && (
                <FileToolbar
                    cords={blockRef.current.getBoundingClientRect()}
                    setToolbar={setToolbar}
                    handleFile={handleFile}
                />
            )}
        </>
    );
}

export default FileBlock;
