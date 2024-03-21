import "./prompt-block.css";

function PromptBlock({ src, title, description, handleClick }) {
    const styles = {
        backgroundImage: `url(${src})`,
    };

    return (
        <figure
            className="prompt__block"
            onClick={handleClick}
            data-type={title}
        >
            <div style={styles} className="bg"></div>
            <div className="info">
                <span className="prompt__block-title">{title}</span>
                <span className="prompt__block-desc">{description}</span>
            </div>
        </figure>
    );
}

export default PromptBlock;
