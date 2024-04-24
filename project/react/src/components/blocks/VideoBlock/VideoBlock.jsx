import "./VideoBlock.css";

function VideoBlock({ src }) {
    return (
        <video className="video-block" controls>
            <source src={src} />
            Your browser does not support the video tag.
        </video>
    );
}

export default VideoBlock;
