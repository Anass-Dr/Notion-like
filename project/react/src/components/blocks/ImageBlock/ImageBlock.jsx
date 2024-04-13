import "./ImageBlock.css";

function ImageBlock({ src }) {
    return <img className="img-block" src={src} alt="image" />;
}

export default ImageBlock;
