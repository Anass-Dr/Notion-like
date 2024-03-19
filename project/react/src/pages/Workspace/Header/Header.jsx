import "./header.css";

function Header() {
    return (
        <header>
            <div className="title">
                <img src="" />
                <span>Page title</span>
            </div>
            <ul id="options">
                <li>Share</li>
                <li>
                    <i className="fa-regular fa-message"></i>
                </li>
                <li>
                    <i className="fa-solid fa-clock-rotate-left"></i>
                </li>
                <li>
                    <i className="fa-regular fa-star"></i>
                </li>
                <li>
                    <i className="fa-solid fa-ellipsis"></i>
                </li>
            </ul>
        </header>
    );
}

export default Header;
