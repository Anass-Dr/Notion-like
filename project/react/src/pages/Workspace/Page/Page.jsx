import { useState } from "react";
import PageImage from "../../../components/PageImage";
import Editor from "../../../Editor/Editor";
import "./page.css";

function Page() {
    const [data, setData] = useState({});

    return (
        <main>
            <PageImage />
            <div className="head" contentEditable>
                <span className="title">Page Title</span>
            </div>
            <div id="editorjs" className="content">
                <Editor data={data} onChange={setData} />
            </div>
        </main>
    );
}

export default Page;
