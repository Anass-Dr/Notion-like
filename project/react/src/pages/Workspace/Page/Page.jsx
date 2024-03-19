import { useState } from "react";
import PageImage from "./PageImage";
import Editor from "../../../Editor";
import "./page.css";

// Initial Data
const INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [],
};

function Page() {
    const [data, setData] = useState(INITIAL_DATA);

    return (
        <main>
            <PageImage />
            <div className="head" contentEditable>
                <span className="title">Page Title</span>
            </div>
            <div id="editorjs" className="content">
                <Editor
                    data={data}
                    onChange={setData}
                    editorblock="editorjs-container"
                />
            </div>
        </main>
    );
}

export default Page;
