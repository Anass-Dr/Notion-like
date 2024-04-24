import { useState } from "react";
import "./ShareToolbar.css";

function ShareToolbar({ cords, setToolbar, handlePublish, handleUnpublish, token }) {
    const [tab, setTab] = useState(1);
    const styles = {
        top: cords.bottom,
        right: "20px",
    };

    return (
        <div className="share__toolbar">
            <div className="offset" onClick={setToolbar}></div>
            <div className="toolbar" style={styles}>
                <header>
                    <ul>
                        <li
                            onClick={() => setTab(1)}
                            className={`toolbar__li ${
                                tab == 1 ? "active" : ""
                            }`}
                        >
                            Share
                        </li>
                        <li
                            onClick={() => setTab(2)}
                            className={`toolbar__li ${
                                tab == 2 ? "active" : ""
                            }`}
                        >
                            Publish
                        </li>
                    </ul>
                </header>
                <main>
                    {tab == 1 ? (
                        <div className="share">
                            <form>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Add people, groups, or emails..."
                                />
                                <button type="submit" className="link__btn">
                                    Invite
                                </button>
                            </form>
                        </div>
                    ) : token ? (
                        <PublishOptions token={token} handleUnpublish={handleUnpublish} />
                    ) : (
                        <PublishComfirm handlePublish={handlePublish} />
                    )}
                </main>
            </div>
        </div>
    );
}

export default ShareToolbar;

function PublishComfirm({ handlePublish }) {
    return (
        <div className="publish">
            <svg
                role="graphics-symbol"
                viewBox="0 0 22 17"
                className="sites"
                style={{
                    width: "30px",
                    height: "30px",
                    display: "block",
                    margin: "auto",
                    fill: "rgba(55, 53, 47, 0.45)",
                    flexShrink: 0,
                    marginBottom: "10px",
                }}
            >
                <path d="M3.305 15.164c-.844 0-1.482-.216-1.914-.648-.433-.428-.649-1.058-.649-1.891V3.117c0-.838.216-1.471.649-1.898.437-.427 1.075-.64 1.914-.64h13.382c.844 0 1.482.213 1.915.64.432.427.648 1.06.648 1.898v5.524l-1.234-1.25a.985.985 0 00-.149-.11.613.613 0 00-.148-.086v-2.57H2.28v7.867c0 .38.097.664.29.852.197.187.476.281.835.281h11.469l-.023 1.54H3.305zm.148-11.836a.68.68 0 00.508-.219.697.697 0 000-1.015.68.68 0 00-.508-.219.714.714 0 00-.523.219.71.71 0 00-.211.508c0 .192.07.362.21.507.147.146.321.22.524.22zm2.305 0c.198 0 .367-.07.508-.21a.705.705 0 000-1.024.68.68 0 00-.508-.219.714.714 0 00-.524.219.71.71 0 00-.21.508.718.718 0 00.734.726zm2.297 0c.198 0 .37-.07.515-.21a.705.705 0 000-1.024.705.705 0 00-.515-.219.705.705 0 00-.516.219.71.71 0 00-.21.508.718.718 0 00.726.726zm7.922 10.695l.078-6.156c.005-.161.073-.265.203-.312.13-.052.25-.024.36.086l4.234 4.336c.125.12.153.247.085.382-.062.13-.174.198-.335.204L19 12.608l1.344 3.11a.374.374 0 01.023.25c-.02.088-.08.153-.18.195l-.773.305a.313.313 0 01-.266-.008.41.41 0 01-.18-.195l-1.265-3.149-1.117 1.133a.372.372 0 01-.398.102c-.146-.047-.217-.157-.211-.329z"></path>
            </svg>
            <span id="publish__title">Publish to web</span>
            <span id="publish__desc">
                Publish a static website of this page.
            </span>
            <button onClick={handlePublish} type="buttun" id="publish__btn">
                Publish
            </button>
        </div>
    );
}

function PublishOptions({ token, handleUnpublish }) {
    const link = `http://localhost:3000/pages/${token}`;
    return (
        <div className="publish">
            <span id="publish__live">
                <svg
                    role="graphics-symbol"
                    viewBox="0 0 16 16"
                    className="blueCircleDot"
                    style={{
                        width: "16px",
                        height: "16px",
                        display: "block",
                        fill: "inherit",
                        flexShrink: 0,
                        marginRight: "6px",
                    }}
                >
                    <circle cx="8" cy="8" r="8" fill="none" stroke="#2383E2">
                        <animate
                            attributeName="r"
                            from="3"
                            to="8"
                            dur="1s"
                            begin="0s"
                            repeatCount="indefinite"
                        ></animate>
                        <animate
                            attributeName="opacity"
                            from="1"
                            to="0"
                            dur="1s"
                            begin="0s"
                            repeatCount="indefinite"
                        ></animate>
                    </circle>
                    <circle cx="8" cy="8" r="3" fill="#2383E2"></circle>
                </svg>
                Live on the web.
            </span>
            <input
                type="url"
                name="publish"
                id="publish__option-input"
                value={link}
                disabled
            />
            <div className="publish__btns">
                <button onClick={handleUnpublish}>Unpublish</button>
                <a href={link} target="_blank">
                    <button>
                        <svg
                            role="graphics-symbol"
                            viewBox="0 0 16 16"
                            className="globe2"
                            style={{
                                width: "16px",
                                height: "16px",
                                display: "block",
                                fill: "#fff",
                                flexShrink: 0,
                                marginRight: "4px",
                            }}
                        >
                            <path d="M8 15.126C11.8623 15.126 15.0615 11.9336 15.0615 8.06445C15.0615 4.20215 11.8623 1.00293 7.99316 1.00293C4.13086 1.00293 0.938477 4.20215 0.938477 8.06445C0.938477 11.9336 4.1377 15.126 8 15.126ZM3.88477 3.76465C4.56836 3.11523 5.39551 2.61621 6.31836 2.34277C5.83301 2.82812 5.42285 3.51172 5.11523 4.3457C4.63672 4.19531 4.22656 3.99707 3.88477 3.76465ZM9.68848 2.34961C10.6045 2.62305 11.4316 3.11523 12.1084 3.76465C11.7734 4.00391 11.3633 4.19531 10.8848 4.35254C10.5771 3.51172 10.167 2.82812 9.68848 2.34961ZM8.47852 2.56836C9.0459 2.8418 9.56543 3.58008 9.93457 4.58496C9.4834 4.66699 8.99805 4.71484 8.47852 4.73535V2.56836ZM6.06543 4.58496C6.44141 3.58008 6.9541 2.8418 7.52148 2.56836V4.73535C7.00195 4.71484 6.5166 4.66699 6.06543 4.58496ZM2.05273 7.58594C2.14844 6.42383 2.58594 5.35059 3.25586 4.46875C3.67285 4.77637 4.21289 5.04297 4.8418 5.24121C4.66406 5.95215 4.54785 6.74512 4.51367 7.58594H2.05273ZM11.4863 7.58594C11.4521 6.74512 11.3359 5.95215 11.1582 5.24121C11.7871 5.04297 12.3271 4.7832 12.7373 4.46875C13.4141 5.35059 13.8516 6.42383 13.9473 7.58594H11.4863ZM5.49121 7.58594C5.52539 6.84082 5.62793 6.12988 5.78516 5.4873C6.33203 5.59668 6.91309 5.66504 7.52148 5.69238V7.58594H5.49121ZM8.47852 7.58594V5.69238C9.08691 5.66504 9.66797 5.59668 10.2148 5.4873C10.3721 6.12988 10.4746 6.84082 10.5088 7.58594H8.47852ZM2.05273 8.54297H4.51367C4.54785 9.39746 4.66406 10.1973 4.8418 10.915C4.21973 11.1133 3.68652 11.373 3.27637 11.6807C2.59277 10.792 2.14844 9.71191 2.05273 8.54297ZM5.49121 8.54297H7.52148V10.4707C6.91992 10.498 6.33203 10.5664 5.79199 10.6689C5.62793 10.0195 5.51855 9.29492 5.49121 8.54297ZM8.47852 10.4707V8.54297H10.5088C10.4814 9.29492 10.3721 10.0195 10.208 10.6689C9.66797 10.5664 9.08691 10.498 8.47852 10.4707ZM11.1582 10.915C11.3428 10.1973 11.4521 9.39746 11.4863 8.54297H13.9473C13.8516 9.71191 13.4072 10.792 12.7236 11.6807C12.3135 11.373 11.7803 11.1133 11.1582 10.915ZM8.47852 11.4277C8.99121 11.4482 9.47656 11.4961 9.9209 11.5781C9.55176 12.5625 9.03906 13.2939 8.47852 13.5605V11.4277ZM6.0791 11.5781C6.52344 11.4961 7.00879 11.4482 7.52148 11.4277V13.5605C6.96094 13.2939 6.44824 12.5625 6.0791 11.5781ZM3.90527 12.3848C4.24023 12.1523 4.65039 11.9609 5.12207 11.8105C5.42969 12.6309 5.83301 13.3008 6.30469 13.7793C5.40234 13.5059 4.58203 13.0205 3.90527 12.3848ZM10.8779 11.8105C11.3496 11.9609 11.7598 12.1523 12.0947 12.3848C11.418 13.0205 10.5977 13.5059 9.69531 13.7793C10.167 13.3008 10.5703 12.6309 10.8779 11.8105Z"></path>
                        </svg>
                        View site
                    </button>
                </a>
            </div>
        </div>
    );
}
