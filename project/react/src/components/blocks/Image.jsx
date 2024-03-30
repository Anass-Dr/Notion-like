import "./Image.css";

function Image() {
    return (
        <div className="_image">
            <div className="icon">
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
            </div>
            <span>Add image</span>
        </div>
    );
}

export default Image;
