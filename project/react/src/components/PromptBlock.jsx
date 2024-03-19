import "./prompt-block.css";

function PromptBlock({ src, title, description }) {
    const styles = {
        backgroundImage: `url(${src})`,
    };

    return (
        <figure className="prompt__block">
            <div style={styles} className="bg"></div>
            <div className="info">
                <span className="prompt__block-title">{title}</span>
                <span className="prompt__block-desc">{description}</span>
            </div>
        </figure>
    );
}

export default PromptBlock;
