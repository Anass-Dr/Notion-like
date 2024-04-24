import "./AudioBlock.css";

function AudioBlock({ src }) {
    return (
        <audio className="audio-block" controls>
            <source src={src} />
            Your browser does not support the audio element.
        </audio>
    );
}

export default AudioBlock;
